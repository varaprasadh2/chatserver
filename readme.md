# chat server

## todo
    - auth
        - login
        - sign up
    
    - presence channels/subscriptions
    - subscriptions 


## authentication
    - TODO
        - handle refresh token
        - email verification link

# docker setup to run postgres db container 

    - `docker pull postgres:<tag>`
    - `docker run --rm --name chatdb -e POSTGRES_PASSWORD=postgres -d -p 5432:5432 -v ./data:/var/lib/postgresql/data postgres`


# database schema
    -TODO: 
        - apply indexes 
    - User 
        - blah 
        - blah

    - Message
        - id
        - senderId,
        - body : text => markdownText, format and render markdown 
                - handle the text when deleting the message;
                 body is enough to handle media
        - created_at,
        - updated_at,

    - Recipient
        - id
        - recipientId
        - message_id,
        - channel_id,
        - status sent | delivered | read 

    - channel
        - id
        - channel name
        - type => direct | group
        - participants: array: [userId]
    - channel_participants 
        - id
        - channelId
        - userId,
    - channelParticipants:
        - id
        - userId
        - channelId
        - status -> active, inactive 
        - createdAt
        - updatedAt



    // TODO: do this later, 
    - channel_activity : to keep track of actions happened in the channel
        - id
        - channel_id
        - activity_type: int ? 
        - content : String markdow? 



# API's 
    - Channels 
        - get channels for the user
        - get messages for a channel
        - delete channel
        - delete message
        - create channel 
        - create message through socket 


# terminologies




# some key things to keep track of
    - for direct chats
        - don't create a channel in db until either side of user sends a message
        - before creating a new channel,check if there is a existing channel

# cases
    - when user tries to message a user + not having a existing channel
    - when user tries to message a user + having a channel



/**
 * @description channel is which users messages are stored 
 * for specific conversation
 * 
 */






