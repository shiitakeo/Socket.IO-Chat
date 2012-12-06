// Express
var express = require('express')
  , http = require('http')
  , app = express()
  ;

app.use(express.static(__dirname + '/public'));

var server = http.createServer(app).listen(3000);
console.log('server start:', 3000);

// Socket.IO
var io = require('socket.io')
  , io = io.listen(server)
  ;

io.sockets.on('connection', function(socket) {
  socket.on('id', function(data){
    console.log("id : " + data);  
    io.sockets.emit('id', data);
  });
  socket.on('msg', function(data) {
    console.log("id : " + data.name + "@ msg : " + data.msg);  
    io.sockets.emit('msg', { id: data.name, post: data.msg });
  });
});
