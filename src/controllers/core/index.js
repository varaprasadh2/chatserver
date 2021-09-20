const { QueryTypes } = require('sequelize');
const uuid = require('uuid');

const { Channel, Message, User, Recipient, ChannelParticipants, sequelize, Sequelize } = require("../../models/index");

// create message
const createMessage = async ({ body, senderId, channelId, files } ) => {

    //TODO: process body 
    //          - upload files if there is any and reformat content

    try{

        const messageId = uuid.v4();

        const message = {
            id: messageId,
            body: body,
            senderId
        }

        if(!!body == false) throw new Error("message body required");
        
        const channel = await Channel.findOne({ where: { id: channelId } });
        
        // if there is no channel, then someone trying to crash app

        if(!channel){  
            throw new Error("channel doesn't exist, message can't be delivered!");
        }

        // get participants for the channel
        const participants = await ChannelParticipants.findAll({
            where: {
                channelId: channelId
            }
        });

        const recipients = (participants || []).map(participant => ({
            id: uuid.v4(),
            recipientId: participant.userId,
            messageId,
            channelId,
            status: 0 // sent, TODO: have to handle delivered and read 
        }));

        if(recipients.length == 0) throw new Error("no participants in the channel somehow,");

        // insert message
        const newMessage = await Message.create(message);
        
        // update channel lastActiveOn for sorting purpose
        await channel.update({
            lastActiveOn: Date.now()
        })
        // insert recipients 
        await Recipient.bulkCreate(recipients);
                

        return {
            message: newMessage,
            recipients,
        };
        
    }catch(error){
        console.log("something wrong at creating message", error);
        throw error;
    }

}

// delete message

const deleteMessage = async payload => {
    try{

        // soft deleting and then permanent delete
        const { messageId, userId } = payload;

        if(!messageId || !userId) throw new Error("operation failed, both messageId and userId required!")  
        const message = await Message.findOne({ where: { id: messageId } });

        if (!message) throw new Error("message doesn't exist");

        // remove from recipients 
        await Recipient.destroy({where: {
            messageId,
            userId
        }});

        // check for at least one recipient
        const recipient = await Recipient.findOne({ where : { messageId: messageId }});

        // if messageId has no recipients simply delete message too
        if(!recipient){
            await message.destroy();
        }

        return message;

    }catch(error){
        console.log("something wrong happened at deleting a message", error);
        throw error;
    }
}

// create channel
const createChannel  =  async payload => {
    try{
        const { participants, displayName = '', ownerId, channelType = 0 } = payload;

        if(!participants || participants.length == 0) throw new Error("couldn't create channel")
        if(channelType === 0 && participants.length !=2) throw new Error("direct conversation should have at least 2 people");
        if(!ownerId) throw new Error("ownerId required to create a channel");

        const channelConfig = {
            id: uuid.v4(),
            displayName,
            type: channelType,
            ownerId
        };

        const newChannel = await Channel.create(channelConfig);

        const participantsData = participants.map(participantId => ({
            id: uuid.v4(),
            channelId: newChannel.id,
            userId: participantId,
            status: 1
        }));

        await sequelize.bulkInsert('ChannelParticipants', participantsData, {});

        return newChannel;

    }catch(error){
        console.log("something wong at creating a channel", error);
        throw error;
    }
}

// delete channel
const deleteChannel = async payload => {
    const { userId, channelId } = payload;
    if(!userId || !channelId) throw new Error("userId and channelId required!");

    // remove user recipients 
    // if it's group remove the user from there and remove from recipients 
    // if it's 
}



/**
 * @param {*} participants currently restricted 
 */

const getCommonChannels = async (userIds, channelType = 0) => {

    if (!userIds || userIds.length == 0) throw new Error("participants required");


    const channels = await sequelize.query(`
        with "userChats" as (
            select c.id from "Channels" c
            left join "ChannelParticipants" cp
                on c.id = cp."channelId"
            where c.type = :channelType and cp."userId" in (:userIds)
        )
        select * from "userChats" uc group by uc.id;
    `,{
        replacements: {
            userIds,
            channelType
        },
        type: QueryTypes.SELECT
    });

    return channels;
}


const getChannelParticipants = async channelId => {
    if(!channelId) throw new Error("channelId required.");
    const participants = await ChannelParticipants.findAll({
        where: {
            channelId: channelId
        }
    });
    return participants;
};


/**
 * 
 * @param userId  
 * @returns 
 * get all the channels for the user, sorted by last message timestamp
 */
const getChannels = async (userId) => {
    // return channels which user not deleted or archived TODO: handle this later;
    if(!userId) throw new Error("userId required to getChannels");

    const _channels = sequelize.query(`
        with "userChannels" as (
  	select
  		ch.*
  	 from "Channels" ch
      left join "ChannelParticipants" cp
      	on ch.id = cp."channelId"
     where cp."userId" = :userId
     group by ch.id
  ),
  "channelMembers" as (
 	select
    	ch.id "channelId",
      json_strip_nulls(
    	json_agg(
          	json_build_object(
              'id', cp."userId",
              'firstName', u."firstName",
              'lastName', u."lastName",
              'email', u.email
            )
        )
       )as participants from "Channels" ch
    left join "ChannelParticipants" cp
        on ch.id = cp."channelId"
    left join "Users" u
        on u.id = cp."userId"
    group by ch.id
    )
    select * from "userChannels" uc
        left join "channelMembers" cm
            on cm."channelId" = uc.id
    `, {
        replacements: {
            userId : userId
        },
        type: QueryTypes.SELECT
    })

   return _channels;

}

module.exports = {
    createMessage,
    deleteMessage,
    createChannel,
    deleteChannel,
    getCommonChannels,
    getChannelParticipants,
    getChannels
}

