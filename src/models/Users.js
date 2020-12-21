const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

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
  saldoId: {
    type: ObjectId,
  },
  vehicleId: [{
    type: ObjectId,
    ref: 'Vehicle'
  }]
});

module.exports = mongoose.model('User', userScheme);
