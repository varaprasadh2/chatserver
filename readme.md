# chat server
# docker setup to run postgres db container 
    - install docker 
    - `docker run --rm --name chatdb -e POSTGRES_PASSWORD=postgres -d -p 5432:5432 -v data:/var/lib/postgresql/data postgres`


# database schema
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

# TODO's

- handle presence channels
- create login/sign up page.
- load channels and handle messages at frontend side
- handle new messages and channel updates
