const express = require('express');
const router = express.Router();

router.get('/reg', (req, res) => {
  res.render('auth/reg', { basedir: 'views', title: '注册' });
});

module.exports = router;