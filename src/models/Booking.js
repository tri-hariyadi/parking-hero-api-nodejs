const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const bookingScheme = new mongoose.Schema({
  arival: {
    type: Date,
    required: true
  },
  invoice: {
    type: String,
    required: true
  },
  parkAreaId: {
    _id: {
      type: ObjectId,
      ref: 'ParkingArea',
      required: true
    },
    title: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
  },
  session: {
    type: Boolean,
  },
  userId: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  payment: {
    type: Number,
    required: true
  },
  vehicleType: {
    _id: {
      type: ObjectId,
      ref: 'Vehicle'
    },
    model: {
      type: String,
    },
    licensePlate: {
      type: String
    }
  }
});

module.exports = mongoose.model('Booking', bookingScheme);
