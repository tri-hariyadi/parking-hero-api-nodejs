const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const vehicleScheme = new mongoose.Schema({
  vehicleLabel: {
    type: String,
    required: true
  },
  typeVehicle: {
    type: String,
    required: true
  },
  licensePlate: {
    type: String,
    required: true
  },
  numberChassis: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  userID: {
    type: ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Vehicle', vehicleScheme);
