const app = require('express')();
const cors = require('cors');
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    // Add port 3000 to CORS since React app will be running on that port
    cors: {
        origin: 'http://localhost:3000',
        // methods: ['GET', 'POST'],
        // credentials: true,
      },
});


app.use(cors());
// app.get('/', (req, res) => {
//     res.send('<h1>Hey Socket.io</h1>');
// });

const NEW_CHAT_EVENT = 'NEW_CHAT_EVENT';
const ROOM = 'Guild Chat'

io.on('connection', (socket) => {
    
    // Join the room when connected
    // const { ROOM } = socket.handshake.query;
    socket.join(ROOM);
    console.log(`Socket ${socket.id} connected to ${ROOM}`);

    // Listen for new messages in the connected room
    socket.on(NEW_CHAT_EVENT, (data) => {
        io.in(ROOM).emit(NEW_CHAT_EVENT, data);
    });

    // Leave the room if the user closes the socket
    socket.on('disconnect', () => {
        console.log('Disconnected')
        socket.leave(ROOM);
    });
});

http.listen(3001, () => {
  console.log('listening on *:3001');
});