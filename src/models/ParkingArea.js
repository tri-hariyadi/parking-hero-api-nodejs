const { timeStamp } = require('console');
const mongoose = require('mongoose');

const parkingAreaScheme = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  slotAvailable: {
    type: Number,
    required: true
  },
  distance: {
    type: Number,
  },
  detail: {
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
    latitudeDelta: {
      type: Number,
    },
    longitudeDelta: {
      type: Number,
    },
  },
  open: {
    type: String,
  },
  close: {
    type: String,
  },
  address: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('ParkingArea', parkingAreaScheme);
