const jwt = require('jsonwebtoken');
const { SECRET } = require('../config');

/**
 * 校验 token 中间件
 * @type {import('express').RequestHandler}
 */
module.exports = (req, res, next) => {
  const token = req.get('token');
  jwt.verify(token, SECRET, err => {
    if (err) {
      res.json({
        code: '2004',
        msg: 'token校验失败',
        data: null
      });
    } else {
      next();
    }
  });
};
