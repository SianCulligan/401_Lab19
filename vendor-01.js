'use strict';
// CHEF in demo
const io = require('socket.io-client');
const socket = io.connect('http://localhost:3001');

let candyOrders = [];

socket.emit('get-orders', 'candy');

socket.on('current-orders', (payload) => {
  console.log('current undelivered orders', payload);
  candyOrders = payload;
});

setInterval(() => {
  if (candyOrders.length > 0) {
    console.log('Thank you for delivering order', candyOrders[0].orderID);
    socket.emit('candy-order-delivered', candyOrders[0]);
  }
}, 5000);
