const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const PORT = process.env.PORT || 3002;
const publicPath = path.join(__dirname + '/../public');
const app = express();
const server = http.createServer(app);

app.use(express.static(publicPath));

server.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});
