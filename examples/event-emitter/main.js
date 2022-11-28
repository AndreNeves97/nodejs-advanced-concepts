const express = require('express');
var bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const domains = require('./domains');
app.use(domains);

const port = 3002;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
