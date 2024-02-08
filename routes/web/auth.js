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

module.exports = router;