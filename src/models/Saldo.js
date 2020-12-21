const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const saldoScheme = new mongoose.Schema({
  nominal: {
    type: Number,
    required: true
  },
  userID: {
    type: ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Saldo', saldoScheme);
