
var socket = io();   //initiating request to server to keep connection open

//we don't use ES6 for functions to avoid incompatibility issues
socket.on('connect', function () {
    console.log('Connected to server');

});

socket.on('disconnect', function () {
    console.log("disconnected from server");
});

socket.on('newMessage', function (message) {
    console.log('new message', message);
});