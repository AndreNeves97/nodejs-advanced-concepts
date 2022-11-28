const express = require('express');

const router = express.Router();
const {
  OrderProcessor,
  PROCESSING_STARTED,
  PROCESSING_FAILED,
  PROCESSING_SUCCESS,
} = require('./order-processor');

const orderProcessor = new OrderProcessor();

orderProcessor.on(PROCESSING_STARTED, (payload) => {
  console.log('PROCESSING_STARTED', { payload });
});

orderProcessor.on(PROCESSING_FAILED, (payload) => {
  console.log('PROCESSING_FAILED', { payload });
});

orderProcessor.on(PROCESSING_SUCCESS, (payload) => {
  console.log('PROCESSING_SUCCESS', { payload });
});

router.post('/', (req, res) => {
  const { body } = req;

  orderProcessor.placeOrder(body);

  res.status(201).send();
});

router.get('/', (req, res) => {
  res.send(`orders`);
});

module.exports = router;
