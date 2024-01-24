const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

router.get('/account', (req, res) => {
  res.render('account', { title: '记账本' });
});

router.post('/account', (req, res) => {
  console.log(req.body);
  res.send('添加记录');
});

router.get('/account/create', (req, res) => {
  res.render('account-create', { title: '添加记录' });
});

module.exports = router;
