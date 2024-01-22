const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('respond with a resource');
});

router.get('/:id', (req, res) => {
  res.send(req.params.id);
});

router.get('/my/edit', (req, res) => {
  res.send('waaa');
});

module.exports = router;
