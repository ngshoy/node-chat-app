const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage} = require('./utils/message');

const PORT = process.env.PORT || 3002;
const publicPath = path.join(__dirname + '/../public');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', socket => {
  console.log('a client has connected');
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

  socket.on('disconnect', () => {
    console.log('a client has disconnected');
  });

  socket.on('createMessage', message => {
    console.log('createMessage', message);
    // socket.broadcast.emit('newMessage', {
    //   ...message,
    //   createdAt: new Date()
    // });
  });

  socket.emit('newMessage', {
    from: 'John',
    text: 'See you then',
    createdAt: new Date()
  });
});

server.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});