const express = require('express');
const router = express.Router();

router.get('/step/:id', (req, res) => {
  const { params, query } = req;
  const { id } = params;

  if (id < 10) {
    res.status(400).send('NOT_FOUND');
    return;
  }

  res.send(`testa: ${id}`);
});

module.exports = router;
