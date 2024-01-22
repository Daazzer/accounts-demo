const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:id', (req, res) => {
  res.send(req.params.id);
});

router.get('/my/edit', (req, res) => {
  res.end('waaa');
});

module.exports = router;
