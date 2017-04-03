const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage,generateLocationMessage } = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();

//express and http are already integrated so much so that we can provide app as function parameter rather than request and response
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

//io.on() registers an event
io.on(`connection`, (socket) => {
    console.log('new user connected');

    socket.emit('newMessage', generateMessage('Admin', "Welcome to the chatroom"));//{ from: 'admin', text: 'Welcome to the chatroom', createdAt: new Date().getTime() });
    socket.broadcast.emit('newMessage', generateMessage("admin", "new user has joined"));//{ from: 'admin', text: 'new User has joined', createdAt: new Date().getTime() });

    socket.on('disconnect', () => {
        console.log('client disconnected');
    });

    socket.on('createMessage', (newMessage, callback) => {

        //io.emit() emits an event to all the connections, socket.emit() emits an event to one connection
        io.emit('newMessage', generateMessage(newMessage.from,newMessage.text));
        callback('This is from the server');
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage("admin",coords.latitude,coords.longitude));
    });
});


//same as app.listen()
server.listen(port, () => {
    console.log(`Listening at port ${port}`);
});