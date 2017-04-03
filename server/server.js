const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { isRealString } = require("./utils/validation");
const {Users} = require('./utils/users');
const { generateMessage, generateLocationMessage } = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();

//express and http are already integrated so much so that we can provide app as function parameter rather than request and response
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

//io.on() registers an event
io.on(`connection`, (socket) => {
    console.log('new user connected');


    socket.on('disconnect', () => {
        console.log('client disconnected');
        var user = users.removeUser(socket.id);

        if(user){
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left.`));
        }
    });

    socket.on("join", (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback("Name and Room name are required");
        }

        socket.join(params.room);

        //io.emit() -> io.to('The Office fans').emit()
        //socket.broadcast.emit() -> socket.broadcast.to("the office fans").emit()

        users.removeUser(socket.id);
        users.addUser(socket.id, params.name,params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));

        socket.emit('newMessage', generateMessage('Admin', `Welcome to the chatroom ${params.room}`));//{ from: 'admin', text: 'Welcome to the chatroom', createdAt: new Date().getTime() });
        socket.broadcast.to(params.room).emit('newMessage', generateMessage("admin", `${params.name} has joined the room`));//{ from: 'admin', text: 'new User has joined', createdAt: new Date().getTime() });


        callback();
    });

    socket.on('createMessage', (newMessage, callback) => {

        var user = users.getUser(socket.id);
        if(user && isRealString(newMessage.text)){
            io.to(user.room).emit('newMessage', generateMessage(user.name, newMessage.text));
        }

        //io.emit() emits an event to all the connections, socket.emit() emits an event to one connection
        
        callback();
    });

    socket.on('createLocationMessage', (coords) => {
        var user = users.getUser(socket.id);
        if(user)
        {   
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
        }
        
    });
});


//same as app.listen()
server.listen(port, () => {
    console.log(`Listening at port ${port}`);
});