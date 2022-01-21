# Quick Chat App using React and Socket.io

This project was bootstrapped with Create React App and Socket.io.

## Running the demo

In the project directory, run:

### `npm install` 

then

### `npm start`

The `start` script will run `node server.js`, which will start an instance of socket.io and begin listening on port 3001.
The script will then run `react-scripts start`, which will start the React app and automatically open your browser.

Once your browser is open, duplicate the tab so you have multiple tabs open at [http://localhost:3000](http://localhost:3000).
This will simulate separate messaging apps. You can enter your username in the field in each tab. You can have as many tabs open as you want to simulate a group chat with many users.

Fill in the usernames in each chat tab and start having conversations with yourself!


## Design and Approach

When reading the requirements and that the project was to build a chat app, my first thought was to integrate Socket.io. I had never actually used this technology before, but have seen it mentioned and ran across it during my own exploration of app features and ideas.

I spent a good amount of time looking over the docs and quick start quides for Socket.io while also exploring other possible avenues to build this app.

I briefly envisioned an app that allowed the creation of multiple resources and their various respective routes (ie: `/users/`, `/messages/`, `/chat_rooms/`, etc), but felt that a full fledged RESTful API would be overboard for the scope of this project.

I settled on only needing to create one object type that would hold all my relevant info instead of multiple models that would need to interact with and reference each other (see NOTES.md). Because I would only be operating with one object type, I decided against using Redux to manage the chat's state. Databases such as PostgreSQL or MongoDB were also decided against for storing messages for the same reason. Additionally, integrating a React app with either of these seemed at first glance to be more time consuming than what this project allowed.

While brainstorming and researching these avenues, I made a 'hello-world' app or two using some quick start guides to familiarize myself with using Socket.io. It became clear that I should integrate that with a React app.


## Building the components

I started the components build with `MessageList`, since that was going to be the main stateful component. I prefer using functional components with hooks. The message list was an empty array created with the `useState()` hook, and I simply mapped over that to spit out an order list of messages. An input was also added to allow a username to be attached.

After this functionality was working, I integrated my code from my Socket.io starter. Instead of `sendMessage` simply appending to the end of the message array, it now dispatched the message to the 'store' being kept by the Socket instance. The `useEffect` hook was implemented for the component to fetch that store.

After I built this component, I began abstracting into further components. Mapping over messages would no longer return just `<li>` elements; `<MessageBubble>` was created to handle this data. 

I planned to abstract to further layers and components in both directions, but found myself getting lost in the weeds of building with MaterialUI components. Ideally, I would have had the `user` input and data handled in a more top level component above the message list, and perhaps edited through an action other than simply an `<input>` element, then passed that data in as props and used in the message object that way.

I also wanted to use the socket ID to differentiate between tabs and set that as the user ID. With this implementation, the IDs could be checked with `message.isOwner`. This check would enforce certain styles on the messages, each tab in the browser would know which messages were sent by them and display their own messages on the right while the messages from all other users could be displayed on the left side of the window, with different colored bubbles indicating respective users. Again, I found myself pouring over style docs and CSS guides. My strength is admittedly more with back-end, styling and working with CSS was proving to take much longer than writing the functionality.


## Other considerations

Even with Socket.io handling the message store, this app would ideally integrate with a database so messages can be persisted through refreshes and stops/restarts. This integration would also need a real API to handle fetching these as well as setting the user/chat rooms/message threads. A message would likely have a foreign key for the user, and a chat room would have a key for the chat_id and message_id. An application such as this could also handle replies to specific messages instead of just one long message chain.

I have recently started learning TypeScript, but opted not to use it for this project. As I was writing components, however, I realized that having a type for the props being passed to `MessageBubble` would have been beneficial, such as:

```
type user = {
    id: number,
    name: string
}

interface MessageProps {
    data: {
        id: number,
        user: user,
        content: string
    }
} 

function MessageBubble(props: MessageProps) {
    ...
}
```

Also, TESTING. I did not write any tests for this application. I have used test suites to write tests for other APIs I am building with Python, but I have not used the testing tools included with Create React App. I was looking into the documentation to write tests using Jest and other tools with CRA, but was doing so at the end of the build. I felt like time needed to learn how to properly use these tools would cut into the project deadline, and hoped that the code provided was sufficient for the scope of the assessment.

I feel confident in the application I wrote considering much of my time was spent learning how to implement a technology I hadn't used before, and the ability to have a group chat with multiple users exceeeds the expectations of the project.


## ADDITIONAL THOUGHTS AFTER SUBMISSION
After thinking about my approach today while shower coding, I came up with some other avenues I wish I had explored.

I used ExpressJS to run a basic server, though I could have utilized that much more for the creation of resources such as `users`, `chats`, and `messages`.

A basic API could be created by defining several routes for `GET` and `POST` requests. The functions handling these requests could retrieve and add data to a simple `data.json` file, which could store the objects and even delete selected ones from the file. 

In server.js, requests could be handled like:

```
app.get('/chats/:id', (req, resp) => {
    // retrieve all messages in the chat room with 'params.id'
})

app.post('/messages', (req, resp) => {
    // Add message from 'req.data'
})

app.get('messages/:from-:to', (req, resp) => {
    // Get messages sent from one user to another
})
etc...
```

The callback functions would be written to either parse the json data and add/retrieve it in `data.json`, or use appropriate methods to handle to fetch the data from a linked db, depending on middleware and other options used.

This approach would need a schema to be defined, and could even work on top of the `message_store` being utilized by Socket.io.

The 'quickly hack it together' technique worked for me considering the restraints, but I would definitely want to define a schema and build these request handlers for a more robust application.

I am open to your thoughts on these design approaches. 

## Bonus

For extra credit, see the technical assessment I completed for the data engineering team; another project I completed without previous knowledge of the tools I was using.
