const Booking = require('../models/Booking');
const Users = require('../models/Users');
const ParkingArea = require('../models/ParkingArea');
const Vehicle = require('../models/Vehicle');
const responseWrapper = require('../config/responseWrapper');

module.exports = {
  booking: async (req, res, next) => {
    const {
      arival,
      parkAreaId,
      userId,
      payment,
      vehicleId
    } = req.body;

    if (
      arival === undefined || !arival ||
      parkAreaId === undefined || !parkAreaId ||
      userId === undefined || !userId ||
      payment === undefined || !payment ||
      vehicleId === undefined || !vehicleId
    ) {
      res.status(404).json(responseWrapper(null, 'Completed all field', 404));
    }

    const parkingArea = await ParkingArea.findOne({ _id: parkAreaId });
    const user = await Users.findOne({ _id: userId });
    const vehicle = await Vehicle.findOne({ _id: vehicleId });

    if (!parkingArea || !user) {
      return res.status(404).json(responseWrapper(
        null,
        !user ? 'User not found' : !parkingArea && 'Parking Area is not found',
        404
      ));
    }

    const invoice = Math.floor(1000000 + Math.random() * 9000000);
    const session = true
    const newBooking = new Booking({
      arival,
      invoice,
      session,
      parkAreaId: {
        _id: parkingArea.id,
        title: parkingArea.name,
        address: parkingArea.address
      },
      userId: user.id,
      payment,
      vehicleType: {
        _id: vehicle.id,
        model: vehicle.typeVehicle,
        licensePlate: vehicle.licensePlate
      }
    });
    newBooking.save((err, bookingPark) => {
      if (err) {
        console.log(err);
        return res.status(500).send(responseWrapper(null, 'Failed to booking a Parking Area', 500));
      }
      res.status(200).send(responseWrapper(
        { invoice: invoice },
        'Successfully booking a Parking Area',
        200
      ));
    });
  }
}
