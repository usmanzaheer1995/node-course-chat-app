
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

socket.on('newLocationMessage', function(message) {
    var li = $('<li></li>');
    //target=_blank opens the link in a new tab
    var a = $('<a target="_blank" >My current location</a>');

    li.text(`${message.from}: `);
    a.attr('href',message.url);

    li.append(a);
    $('#messages').append(li);
});

$('#message-form').on('submit', function (e) {
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: $('[name=message]').val(),
    }, function () {
        $('[name=message]').val('');
    });
});

var locationButton = $('#send-location');
locationButton.on('click',function(e) {
    e.preventDefault();
    
    if(!navigator.geolocation) {
        return alert('geolocation not supported for your browser');
    }

    locationButton.attr('disabled','disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function(position) {
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude, 
        });
    }, function(err) {
        alert('Unable to fetch location');
        locationButton.removeAttr('disabled').text('Send location');
    });
});

