'use strict';
//WAITER in demo

const express = require('express');
const app = express();

const cors = require('cors');

const io = require('socket.io-client');
const socket = io.connect('http://localhost:3001');

app.use(express.json());
app.use(cors());

app.get('/', (req ,res, next) => {
  res.status(200);
  res.send(`You've got a homepage!`);
});

//something to share info with another file - in the example, type may be 'chef' and id/menu numb may be #2

app.post('/delivery/:vendor/:orderID', (req, res, next) => {
  console.log('Order', req.params.vendor, req.params.orderID);
  let order = {
    vendor: req.params.vendor,
    orderID: req.params.orderID,
  };
  socket.emit('delivered', order);
  res.status(200);
  res.send(order);
});

app.listen(3000, () => {
  console.log('API Server up and running on 3000');
});