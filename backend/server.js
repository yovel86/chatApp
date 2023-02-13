const http = require('http');
const express = require('express');
const app = express();

// const expressServer = require('express')();
// const server = require('http').createServer(expressServer);
const server = http.createServer(app);
const io = require('socket.io')(server, { cors: { origin: '*' } });

const port = 8100;

server.listen(port, () => console.log(`Server started & listening in port ${port}`));

// Socket.io EVENTS

// When connection established
io.on('connection', (socket) => {
  console.log(`User connected with ID: ${socket.id}`);

  // When an User joins a room
  socket.on('join-room', (data) => {
    socket.join(data.room);
    console.log(`${data.userName} joined in ${data.room}`);
    socket.broadcast.to(data.room).emit('new-user-joined', { id: socket.id, userName: data.userName, message: ' HAS JOINED THE ROOM!' });
  });

  // When an User left a room
  socket.on('leave-room', (data) => {
    console.log(`${data.userName} has left from ${data.room}`);
    socket.broadcast.to(data.room).emit('user-left-room', { userName: data.userName, message: ' HAS LEFT THE ROOM :(' });
    socket.leave(data.room);
  });

  // Message Event
  socket.on('send-message', (data) => {
    io.in(data.room).emit('new-message', { userName: data.userName, message: data.message });
  });

});









