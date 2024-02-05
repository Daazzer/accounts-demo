const express = require('express');
const router = express.Router();
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const moment = require('moment');
const adapter = new FileSync(__dirname + '/../data/db.json');
const db = low(adapter);
const AccountModel = require('../models/AccountModel');

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'AccountsDemo' });
});

router.get('/account', (req, res) => {
  AccountModel.find().sort({ time: -1 }).exec((err, data) => {
    if (err) {
      res.status(500).send('读取失败');
      return;
    }

    res.render('account', {
      basedir: 'views',
      title: '记账本',
      accounts: data,
      moment
    });
  });
});

router.post('/account', (req, res) => {
  // 写入文件
  AccountModel.create({
    ...req.body,
    time: moment(req.body.time).toDate()
  }, err => {
    if (err) {
      res.status(500).send('插入失败');
      return;
    }
    res.render('success', { title: ':) 添加成功', url: '/account' });
  });
});

router.get('/account/create', (req, res) => {
  res.render('account-create', { title: '添加记录' });
});

router.get('/account/:id', (req, res) => {
  const id = req.params.id;
  AccountModel.deleteOne({ _id: id }, (err, data) => {
    if (err) {
      res.status(500).send('删除失败');
      return;
    }
    res.render('success', { title: ':) 删除成功', url: '/account' });
  })
});

module.exports = router;
