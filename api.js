'use strict';
//WAITER in demo

const express = require('express');
const app = express();

const morgan = require('morgan');
const cors = require('cors');

const io = require('socket.io-client');
const socket = io.connect('http://localhost:3001');

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.get('/', (req ,res, next) => {
  res.status(200);
  res.send(`You've got a homepage!`);
});

//something to share info with another file - in the example, type may be 'chef' and id/menu numb may be #2

// app.post('/order/:type/:number', (req, res, next) => {
app.post('/delivery/:vendor/:orderID', (req, res, next) => {
  console.log('delivery', req.params.vendor, req.params.orderID);
  let order = {
    vendor: req.params.vendor,
    orderID: req.params.orderID,
  };

  if (!(order.vendor === 'flower' || order.vendor === 'candy')) {
    res.status(400);
    res.send('Incorrect order vendor');
  } else {
    socket.emit('received', order);
    res.status(200);
    res.send('Sent order to queue');
  }});

app.listen(3000, () => {
  console.log('API Server up and running on 3000');
});