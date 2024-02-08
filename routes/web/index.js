const express = require('express');
const router = express.Router();
const moment = require('moment');
const AccountModel = require('../../models/AccountModel');

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
  AccountModel.deleteOne({ _id: id }, err => {
    if (err) {
      res.status(500).send('删除失败');
      return;
    }
    res.render('success', { title: ':) 删除成功', url: '/account' });
  });
});

router.get('/get-cookie', (req, res) => {
  res.send(`欢迎您 ${req.cookies.name}`);
});

router.get('/set-cookie', (req, res) => {
  res
    // 在浏览器关闭时销毁
    // .cookie('name', 'zhangsan')
    // cookie 一分钟过期
    .cookie('name', 'lisi', { maxAge: 6e4 })
    .send('set-cookie');
});

router.get('/remove-cookie', (req, res) => {
  res
    .clearCookie('name')
    .send('删除 cookie 成功');
});

router.get('/login', (req, res) => {
  // username=admin&password=admin
  const { username, password } = req.query
  if (username === 'admin' && password === 'admin') {
    req.session.username = 'admin';
    req.session.uid = '258aefccc';
    res.send('登录成功');
  } else {
    res.send('登录失败');
  }
});

router.get('/cart', (req, res) => {
  // 检测 session 是否存在用户数据
  const { username } = req.session;
  if (username) {
    res.send(`欢迎您${username}`)
  } else {
    res.send('请登录');
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.send('退出成功');
  });
});

module.exports = router;
