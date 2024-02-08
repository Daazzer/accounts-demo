const express = require('express');
const router = express.Router();
const UserModel = require('../../models/UserModel');
const md5 = require('md5');

router.get('/reg', (req, res) => {
  res.render('auth/reg', { basedir: 'views', title: '注册' });
});

router.post('/reg', (req, res) => {
  UserModel.create({ ...req.body, password: md5(req.body.password) }, err => {
    if (err) {
      return res.status(500).send('注册失败');
    }

    res.render('success', { title: '注册成功', url: '/login' });
  });
});

router.get('/login', (req, res) => {
  res.render('auth/login', { basedir: 'views', title: '登录' });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  UserModel.findOne({ username, password: md5(password) }, (err, data) => {
    if (err) {
      return res.status(500).send('登录失败');
    } else if (!data) {
      return res.send('账号或密码错误');
    }

    req.session.username = data.username;
    req.session._id = data.id;

    res.render('success', { title: '登录成功', url: '/account' });
  });
});

module.exports = router;