const MESSAGE_STORE = [
    {
        userId: 1,
        messageId: 1,
        content: "Hello, there."
    },
    {
        userId: 2,
        messageId: 2,
        content: "General Kenobi"
    },
    {
        userId: 1,
        messageId: 3,
        content: "You're shorter than I expected."
    }
]

ChatWindow => Contains list of messages, input, send button.
message_store => array of objects (messages). When a message is sent, the message and userId are added to the end of the Array
UserId or name is selected when sending a message. Or hardcoded when App instantiates. Have two instances of App load in separate windows/ports and hardcode then?

Use redux to handle message store? Chat API? Sockets?


<ChatWindow> 'UserID' set here or in top level 'App' component?
    <MessageList /> This should connect to socket.io to get a list of the messages
    <Input /> Submit action send the message with UserID to messagelist that socket.io is listening to
<ChatWindow />

Get basic components working with sockets before moving on to styling - use Material UI so it looks pretty without a lot of time investment

