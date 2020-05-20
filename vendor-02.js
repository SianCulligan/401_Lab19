'use strict';

//BARTENDER in demo
const io = require('socket.io-client');
const socket = io.connect('http://localhost:3001');

let flowerOrders = [];

socket.emit('get-orders', 'flower');

socket.on('current-orders', (payload) => {
  console.log('current undelivered orders', payload);
  flowerOrders = payload;
});

setInterval(() => {
  if (flowerOrders.length > 0) {
    console.log('Thank you for delivering order', flowerOrders[0].orderID);
    socket.emit('flower-order-delivered', flowerOrders[0]);
  }
}, 3000);