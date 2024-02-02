const { DB_HOST, DB_NAME, DB_PROT } = require('../config');

module.exports = (success, error) => {
  const mongoose = require('mongoose');

  mongoose.set('strictQuery', true);

  // 连接数据库
  mongoose.connect(`mongodb://${DB_HOST}:${DB_PROT}/${DB_NAME}`);

  mongoose.connection.once('open', () => {
    success();
  });

  mongoose.connection.on('error', () => {
    if (typeof error !== 'function') {
      console.log('连接失败');
      return;
    }

    error();
  });

  mongoose.connection.on('close', () => {
    console.log('连接关闭');
  });
};
