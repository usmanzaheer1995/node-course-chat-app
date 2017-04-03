const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

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

    // socket.emit('newEmail', {
    //     from: "mike@example.com",
    //     text: "Hi there",
    //     createdAt: 123
    // });

    // socket.on('createEmail', (newEmail) => {
    //     console.log('create email', newEmail);
    // });

    socket.on('disconnect', () => {
        console.log('client disconnected');
    });

    socket.on('createMessage', (newMessage) => {
        console.log('new message', newMessage);
    });

    socket.emit('newMessage', {
        from:'babuG@gmail.com',
        text: 'raga jeeeee',
        createdAt: 123
    });
});


//same as app.listen()
server.listen(port, () => {
    console.log(`Listening at port ${port}`);
});