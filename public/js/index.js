
var socket = io();   //initiating request to server to keep connection open

//we don't use ES6 for functions to avoid incompatibility issues
socket.on('connect', function () {
    console.log('Connected to server');

    // socket.emit('createEmail', {
    //     to: 'jen@example.com',
    //     text: 'well hello to you too',

    // });

    socket.emit('createMessage', {
        from: 'chachu@hotmail.com',
        text: 'im going away',
    })
});

socket.on('disconnect', function () {
    console.log("disconnected from server");
});

//custom event  
// socket.on('newEmail', function (email) {
//     console.log('new email', email);
// });

socket.on('newMessage', function (message) {
    console.log('new message', message);
});