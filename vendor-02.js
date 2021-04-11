'use strict';

//BARTENDER in demo
const io = require('socket.io-client');
const socket = io.connect('http://localhost:3001');

let deliveredOrders = [];

socket.emit('subscribe', 'flower-vendor');
socket.emit('getAll', 'flower-vendor');

socket.on('queue', (payload) => {
  console.log('current queue', payload);
  if (payload && payload.length)
    console.log('Thank you for delivering order', payload[0]);
  socket.emit('received', 'flower-vendor');
});
