const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  time: Date,
  type: {
    type: Number,
    default: -1
  },
  account: {
    type: Number,
    required: true
  },
  remarks: String
});

module.exports = mongoose.model('accounts', Schema);
