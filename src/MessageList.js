import { Button, Container, List, ListItem, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import MessageBubble from "./MessageBubble";

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

    // The User can be set in each window and displayed in the chat bubble
    const [user, setUser] = useState("Anonymous")

    // These methods and their respective states could be abstracted later with something like
    // setState(e.target.name: e.target.value)
    const handleUserChange = (e) => {
        setUser(e.target.value)
    }

    const handleMsgChange = (e) => {
        setMessage(e.target.value)
    }

    // sendMessage should send the message to socket store instead of setting state directly
    const sendMessage = () => {
        // Only send a message if there is content in it
        if (message != "") {
            // Use socket emit to send data to the store
            socketRef.current.emit(NEW_CHAT_EVENT, {
                userId: socketRef.current.id,
                user: user,
                content: message,
            });
        };
        // Clear the input after the message is sent
        setMessage("");
    };

    // Ex sendMessage with simple state before socket.io was set up
    // const sendMessage = () => {
    //     // Add message to array of objects
    //     setMessageList( (messageList) => [...messageList,
    //         {
    //             user: user,
    //             content: message
    //         }
    //     ]);
    //     // Clear the input after the message is sent 
    //     setMessage("");
    // }

    // Connect to sockets when component renders
    useEffect(() => {
        // create a new client with server url 
        socketRef.current = socketIOClient(SOCKET_SERVER_URL);
    
        // listen for new messages in message store
        socketRef.current.on(NEW_CHAT_EVENT, (message) => {
          const newMessage = {
            ...message,
            isOwner: message.userId === socketRef.current.id,
          };
          // update message store with new message
          setMessageList( (messageList) => [...messageList, newMessage]);
        });
    

        return () => {
          socketRef.current.disconnect();
        };
    }, []);

    // Input should send message if user hits enter (keyCode13 is 'Enter' key)
    const keyPress = (e) => {
        if(e.keyCode == 13){
           
           sendMessage();
        }
    }

    return (
        <>
        <List >
            {messageList.map( (msg, i) => (  
                // Can check msg.isOwner property here to align items based on who sent it
                // If the userId matches the socketRefId, then align the bubble to the right
                // If not, then align the bubble on the left
                <ListItem key={i}>
                    <MessageBubble message={msg} />
                </ListItem>      
            ))}
        </List>
        <Container >
                <TextField 
                    fullWidth
                    label="Message ('Enter' to send):"
                    name="message"
                    value={message}
                    onChange={handleMsgChange}
                    onKeyDown={keyPress}
                />
                <Button variant='outlined' onClick={sendMessage} >Send</Button>
        </Container>
       
        <TextField 
            label="Your Username"
            name="user"
            value={user}
            onChange={handleUserChange}
        />
        </>
    )


    // Written before adding styles:
    // return (
    //     <>
    //     {console.log(messageList)}
    //     <label htmlFor="user" >Username:</label>
    //     <input name="user" value={user} onChange={handleUserChange} />
    //     {/* <ol >
    //         {messageList.map( (msg, i) => (
    //             <li key={i}><h4>From: {msg.user}</h4><p>{msg.content}</p></li>
    //         ))}
    //     </ol> */}
    // 
    //     <label htmlFor="message" >Message:</label>
    //     <input 
    //         name="message"
    //         value={message}
    //         onChange={handleMsgChange}
    //     />
    //     <button onClick={sendMessage}>
    //         Send
    //     </button>
    //     </>
    // )

}