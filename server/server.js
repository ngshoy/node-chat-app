const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {
  generateMessage,
  generateLocationMessage
} = require('./utils/message');
const { isRealString } = require('./utils/validation');

const PORT = process.env.PORT || 3002;
const publicPath = path.join(__dirname + '/../public');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', socket => {
  console.log('a client has connected');

  socket.on('join', (params, callback) => {
    socket.join(params.room);
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));

    socket.on('createMessage', (message, cb) => {
      console.log('createMessage', message);
      io.to(params.room).emit('newMessage', generateMessage(message.from, message.text));
      cb();
    });
  
    socket.on('createLocationMessage', (coords) => {
      io.to(params.room).emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });

    if(!isRealString(params.name) || !isRealString(params.room)) {
      callback('Name and room name are required.');
    }
  
    callback();
  });

  socket.on('disconnect', () => {
    console.log('a client has disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});