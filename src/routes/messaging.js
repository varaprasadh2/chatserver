const { getCommonChannels, createChannel, getChannelParticipants, createMessage, getChannels } = require('../controllers/core');

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
                    channelId = null,  // null if first time trying to send a direct message 
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

            // if it's group chat and channelId is not sent by client, 
            if(!session.channelId) throw new Error("channelId is required");

            
            // just create a message it'll handle rest;
            const {message,  recipients } = await createMessage({
                body,
                senderId : currentUser.userId,
                channelId: session.channelId,
                files: []
            });
            
            //TODO: re-active inactive(deleted the chat their side) channel_participants ie, set active = 1 if active = 0;

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

// can create a group chat channel 
Router.post("/new-channel", (req, res)=>{
    // TODO: creates new group chat channel 
    
})

Router.get("/channels", async (req,res)=> {
    // return active channels for the user,
    try{
        const currentUser = req.user;
        // make a query to get channel info
        const channels = await getChannels(currentUser.userId);

        res.send({
            channels
        })
        
    }catch(err){
        return res.status(400).send({
            error: error.message
        });
    }
});


module.exports = Router;