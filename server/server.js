const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage } = require('./utils/message');
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
        console.log('new message', newMessage);

        //io.emit() emits an event to all the connections, socket.emit() emits an event to one connection
        io.emit('newMessage', generateMessage(newMessage.from,newMessage.text));
        callback('This is from the server');
        //broadcast sends message to everyone but the one sending it
        // socket.broadcast.emit('newMessage',{
        //     from:'usman',
        //     text: 'another message for everyone else',
        //     createdAt: new Date().getTime()
        // });
    });
});


//same as app.listen()
server.listen(port, () => {
    console.log(`Listening at port ${port}`);
});