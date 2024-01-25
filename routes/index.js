const express = require('express');
const router = express.Router();
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync(__dirname + '/../data/db.json');
const db = low(adapter);
const shortid = require('shortid');

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'AccountsDemo' });
});

router.get('/account', (req, res) => {
  res.render('account', { basedir: 'views', title: '记账本' });
});

router.post('/account', (req, res) => {
  const id = shortid.generate();
  // 写入文件
  db.get('accounts').unshift({ id, ...req.body }).write();
  res.send('添加记录');
});

router.get('/account/create', (req, res) => {
  res.render('account-create', { title: '添加记录' });
});

module.exports = router;
