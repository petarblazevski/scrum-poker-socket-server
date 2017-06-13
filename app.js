var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.use(express.static(__dirname + '/node_modules'));
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
})

io.on('connection', function(socket) {
    console.log('a user connected');

    socket.on('disconnect', function(socket) {
        console.log('user disconnected');
    })

    socket.on('room', function(room) {
    	console.log('User will join room: ' + room);
        socket.join(room);
    })

    socket.on('leaveRoom', function(room) {
    	console.log('User left the room: ', room);
    	socket.leave(room);
    })

    socket.on('message', function(id, msg) {
    	console.log(id + ': ' + msg);
    	socket.broadcast.to(id).emit('message', msg);
    })
})

http.listen(4222, function() {
    console.log('listening on *:4222');
});