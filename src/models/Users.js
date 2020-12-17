const mongoose = require('mongoose');

const userScheme = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    maxlength: 200
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: 1
  },
  phonenumber: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
});

module.exports = mongoose.model('User', userScheme);
