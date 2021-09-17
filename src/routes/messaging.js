const { getCommonChannels, createChannel, getChannelParticipants, createMessage } = require('../controllers/core');

const Router = require('express').Router();

/**
 * @description
 *  handles new message, and creates a channel if this is direct chat, 
 */

Router.post("/message", async (req,res)=> {

        try{

            const currentUser = req.user || {};

            const { 
                    body = '',
                    channelId = null,
                    participants, 
                    channelType = 0,

                } = req.body;

            if(!!body == false) throw new Error("message body is required");


            const session = {
                channelId: channelId
            };

            if(channelType == 0){
                const commonChannels = await getCommonChannels(participants, channelType);
                session.channelId = commonChannels.length ? commonChannels[0].id : null;
                // if there is no existing channel then create one
                if(!session.channelId){
                    const newChannel = await createChannel({ 
                        participants,
                        displayName: '',
                        ownerId : currentUser.userId, 
                        type: channelType
                     });
                     session.channelId = newChannel.id;
                }
            }

            
            // just create a message it'll handle rest;
            const {message,  recipients } = await createMessage({
                body,
                senderId : currentUser.userId,
                channelId: session.channelId,
                files: []
            });
            
            // emit a message on this channel, and have to check if user is online and didn't subscribed this channel 
            // req.pusher.emit(channelId, 'message', { message, ...info })
            // FIXME: req.pusher.emit(session.channelId, 'NEW_MESSAGE', message);


           return res.send({
               status: "success",
               message
           });


        }catch(error){
            console.error(error);

            res.status(400).send({
                error: error.message
            });
        }
});

Router.post("/new-channel", (req, res)=>{
    // creates new group chat channel 
 
})



module.exports = Router;