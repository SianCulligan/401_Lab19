'use strict';
//QUEUE in demo

//socket server
const io = require('socket.io')(3001);

let queue = {};

//"waiter" & queue haveto be on differnet connections
io.on('connection', (socket) => {
  console.log('Connected to', socket.id);

  socket.on( 'delivered', (payload) => {
    // console.log('saving order', payload);
    if (queue[payload.vendor]) {
      queue[payload.vendor].push(payload.orderID);
      io.to(payload.vendor).emit('queue', queue[payload.vendor]);
    } else {
      queue[payload.vendor] = [payload.orderID];
      io.to(payload.vendor).emit('queue', queue[payload.vendor]);
    }
    console.log('Current queue', queue);
  });

  socket.on('subscribe', (payload) => {
    socket.join(payload);
  });

  socket.on('getAll', (payload) => {
    socket.emit('queue', queue[payload]);
  });

  socket.on('received', (payload) => {
    if (queue[payload] && queue[payload].length) {
      queue[payload].shift();
      socket.emit('queue', queue[payload]);
    }
  });});