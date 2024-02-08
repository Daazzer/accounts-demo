const express = require('express');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const UserModel = require('../../models/UserModel');
const { SECRET } = require('../../config');
const router = express.Router();

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  UserModel.findOne({ username, password: md5(password) }, (err, data) => {
    if (err) {
      return res.json({
        code: '2001',
        msg: '数据库读取失败',
        data: null
      });
    } else if (!data) {
      return res.json({
        code: '2002',
        msg: '用户名或密码错误',
        data: null
      });
    }

    const token = jwt.sign({
      username: data.username,
      id: data._id
    }, SECRET, {
      expiresIn: 604800
    });

    res.json({
      code: '0000',
      msg: '登录成功',
      data: token
    });
  });
});

router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.render('success', { title: ':) 退出成功', url: '/login' });
  });
});

module.exports = router;