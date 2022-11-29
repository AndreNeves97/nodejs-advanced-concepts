const express = require('express');
const router = express.Router();

const domains = [
  { path: '/orders', module: require('./orders') },
];

router.get('/', (_, res) => {
  res.send('Hello World');
});

domains.forEach((domain) => {
  router.use(domain.path, domain.module);
});

module.exports = router;
