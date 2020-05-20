'use strict';
//QUEUE in demo

//socket server
const io = require('socket.io')(3001);

let queue = {
  // bar: [],
  flowerShop: [],
  // chef: [],
  candyShop: [],
};


//waiter  &queue haveto be on differnet connections
io.on('connection', (socket) => {
  console.log('Connected to', socket.id);

  socket.on( 'received', (payload) => {
    // console.log('saving order', payload);
    if (payload.vendor === 'flowers') {
      queue.flowerShop.push(payload.orderID);
      //   socket.emit('order-queued', payload);
      io.to('flowerShop').emit('current-orders', queue.flowerShop);
    } else if (payload.vendor === 'candy') {
      queue.candyShop.push(payload.orderID);
      //   socket.emit('order-queued', payload);
      io.to('candyShop').emit('current-orders', queue.candyShop);
    }
  });

  socket.on('get-orders', (payload) => {
    if (payload === 'flowerShop') {
      socket.join('flowerShop');
      socket.emit('current-orders', queue.flowerShop);
    } else if (payload === 'candyShop') {
      socket.join('candyShop');
      socket.emit('current-orders', queue.candyShop);
    }
  });

  socket.on('candy-order-delivered', (payload) => {
    queue.candyShop.shift();
    io.to('candyShop').emit('current-orders', queue.candyShop);
  });

  socket.on('flower-order-delivered', (payload) => {
    queue.flowerShop.shift();
    io.to('flowerShop').emit('current-orders', queue.flowerShop);
  });
});