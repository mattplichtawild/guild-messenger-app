import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

// Socket.io is listening on port 3001, so need to set server url to 3001
const SOCKET_SERVER_URL = "http://localhost:3001";
const NEW_CHAT_EVENT = 'NEW_CHAT_EVENT';

export default function MessageList() {
    // To connect to socket.io
    const socketRef = useRef();
    
    // Component state will be list of messages
    const [messageList, setMessageList] = useState([]);

    // Need to handle input state for new message
    const [message, setMessage] = useState("")

    const [user, setUser] = useState("Anonymous")

    // sendMessage should send the message to socket store instead of setting state directly
    // MessageList component connects to the store 
    const sendMessage = () => {
        socketRef.current.emit(NEW_CHAT_EVENT, {
            userId: socketRef.current.id,
            user: user,
            content: message,
        });
        // Clear the input after the message is sent
        setMessage("");
    };

    // To connect to sockets 
    useEffect(() => {
        // create a new client with our server url
        socketRef.current = socketIOClient(SOCKET_SERVER_URL);
    
        // listen for new messages in message store
        socketRef.current.on(NEW_CHAT_EVENT, (message) => {
          const newMessage = {
            ...message,
            isOwner: message.senderId === socketRef.current.id,
          };
          // update message store with new message
          setMessageList( (messageList) => [...messageList, newMessage]);
        });
    

        return () => {
          socketRef.current.disconnect();
        };
      }, []);

    // Ex sendMessage with simple state before sockets are set up
    // const sendMessage = () => {
    //     // Add message to array of objects
    //     setMessageList( (messageList) => [...messageList,
    //         {
    //            //userId is set elsewhere and inherited
    //             user: user,
    //             content: message
    //         }
    //     ]);
    //     // Clear the input after the message is sent 
    //     setMessage("");
    // }

    const handleUserChange = (e) => {
        setUser(e.target.value)
    }
    const handleMsgChange = (e) => {
        setMessage(e.target.value)
    }

    return (
        <>
        <label htmlFor="user" >Username:</label>
        <input name="user" value={user} onChange={handleUserChange} />
        <ol >
            {messageList.map( (msg, i) => (
                <li key={i}><h4>From: {msg.user}</h4><p>{msg.content}</p></li>
            ))}
        </ol>
        <label htmlFor="message" >Message:</label>
        <input 
            name="message"
            value={message}
            onChange={handleMsgChange}
        />
        <button onClick={sendMessage}>
            Send
        </button>
        </>
    )

}