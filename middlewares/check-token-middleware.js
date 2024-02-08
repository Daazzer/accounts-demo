const jwt = require('jsonwebtoken');

/**
 * @type {import('express').RequestHandler}
 */
module.exports = (req, res, next) => {
  const token = req.get('token');
  jwt.verify(token, 'shenmegui', err => {
    if (err) {
      return res.json({
        code: '2004',
        msg: 'token校验失败',
        data: null
      });
    } else {
      next();
    }
  });
};