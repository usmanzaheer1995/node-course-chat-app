function scrollToBottom() {
    //Selectors
    var messages = $('#messages');
    var newMessage = $('#messages').children('li:last-child');

    //Heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}

var socket = io();   //initiating request to server to keep connection open

//we don't use ES6 for functions to avoid incompatibility issues
socket.on('connect', function () {
    console.log('Connected to server');
    var params = $.deparam(window.location.search);
    
    socket.emit("join", params, function(err) {
        if(err){
            alert(err);
            window.location.href = "/";
        }
        else{
            console.log("No error");
        }
    });
});

socket.on('disconnect', function () {
    console.log("disconnected from server");
});

socket.on('newMessage', function (message) {

    var formattedTime = moment(message.createdAt).format('Do MMMM, YYYY h:mm a');

    var template = $('#message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    $('#messages').append(html);
    scrollToBottom();
});

socket.on('newLocationMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('Do MMMM, YYYY h:mm a');

    var template = $('#location-message-template').html();
    var html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        createdAt: formattedTime
    });

    $('#messages').append(html);
    scrollToBottom();
});

$('#message-form').on('submit', function (e) {
    e.preventDefault();
    var params = $.deparam(window.location.search);
    //console.log(params.name);
    socket.emit('createMessage', {
        from: params.name,
        text: $('[name=message]').val(),
    }, function () {
        $('[name=message]').val('');
    });
});

socket.on('updateUserList', function(users) {
    //console.log("users list", users);
    var ol = $('<ol></ol>');

    users.forEach(function(user) {
        ol.append($('<li></li>').text(user));
    });

    $('#users').html(ol);
});

var locationButton = $('#send-location');
locationButton.on('click', function (e) {
    e.preventDefault();

    if (!navigator.geolocation) {
        return alert('geolocation not supported for your browser');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        });
    }, function (err) {
        alert('Unable to fetch location');
        locationButton.removeAttr('disabled').text('Send location');
    });
});

