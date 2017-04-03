
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
    var li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    $('#messages').append(li);
});

// socket.emit('createMessage', {
//     from: 'frank',
//     text: 'hi'
// }, function(data) {
//     console.log(data);
// });

$('#message-form').on('submit', function(e) {
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: $('[name=message]').val(),
    }, function() {

    });

    $('[name=message]').val('');
});