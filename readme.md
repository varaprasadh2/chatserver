# chat server

## todo
    - presence channels/subscriptions
    - subscriptions 


## authentication
    - TODO
        - handle refresh token
        - email verification link

# docker setup to run postgres db container 
    - install docker 
    - `docker run --rm --name chatdb -e POSTGRES_PASSWORD=postgres -d -p 5432:5432 -v data:/var/lib/postgresql/data postgres`


# database schema
    -TODO: 
        - apply indexes 
    - User 
        - blah 
        - blah

    - Message
        - id
        - senderId,
        - files : array<jsonb> contains file metadata if any
        - body : text => markdownText, format and render markdown 
                - handle the text when deleting the message.
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

    // TODO: do this later, useful in group chats,  
    - channel_activity : to keep track of actions happened in the channel
        - id
        - channel_id
        - activity_type: int ? 
        - content : String markdown? 



# API's 
    - Channels 
        - get channels for the user
        - get messages for a channel
        - delete channel
        - delete message
        - create channel 
        - create message through socket 


# terminologies
    - channel: normal chat thread. can be a direct chat or group chat


/**
 * @description channel is which users messages are stored 
 * for specific conversation
 * 
 */






