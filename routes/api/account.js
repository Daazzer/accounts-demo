const express = require('express');
const moment = require('moment');
const jwt = require('jsonwebtoken');
const AccountModel = require('../../models/AccountModel');
const checkTokenMiddleware = require('../../middlewares/check-token-middleware');
const router = express.Router();

router.get('/account', checkTokenMiddleware, (req, res) => {
  AccountModel.find().sort({ time: -1 }).exec((err, data) => {
    if (err) {
      res.json({
        code: '1001',
        msg: '读取失败',
        data: null
      });
      return;
    }

    res.json({
      code: '0000',
      msg: '读取成功',
      data
    });
  });
});

router.post('/account', checkTokenMiddleware, (req, res) => {
  // 写入文件
  AccountModel.create({
    ...req.body,
    time: moment(req.body.time).toDate()
  }, (err, data) => {
    if (err) {
      res.json({
        code: '1002',
        msg: '创建失败',
        data: null
      });
      return;
    }

    res.json({
      code: '0000',
      msg: '创建成功',
      data
    });
  });
});

router.delete('/account/:id', checkTokenMiddleware, (req, res) => {
  const _id = req.params.id;
  AccountModel.deleteOne({ _id }, (err, data) => {
    if (err) {
      res.json({
        code: '1003',
        msg: '删除失败',
        data: null
      });
      return;
    }

    res.json({
      code: '0000',
      msg: '删除成功',
      data
    });
  });
});

// 获取单个账单信息
router.get('/account/:id', checkTokenMiddleware, (req, res) => {
  const { id } = req.params;
  AccountModel.findById(id, (err, data) => {
    if (err) {
      return res.json({
        code: '1004',
        msg: '读取失败',
        data: null
      });
    }

    res.json({
      code: '0000',
      msg: '读取成功',
      data
    });
  });
});

// 更新单个账单
router.patch('/account/:id', checkTokenMiddleware, (req, res) => {
  const _id = req.params.id;

  AccountModel.updateOne({ _id }, req.body, err => {
    if (err) {
      return res.json({
        code: '1005',
        msg: '更新失败',
        data: null
      });
    }

    // 再次查询数据库来获取单条数据
    AccountModel.findById(_id, (err, data) => {
      if (err) {
        return res.json({
          code: '1004',
          msg: '读取失败',
          data: null
        });
      }

      res.json({
        code: '0000',
        msg: '更新成功',
        data
      });
    });
  });
});

module.exports = router;
