const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
  username: String,
  password: String
});

module.exports = mongoose.model('users', Schema);
