const ParkingArea = require('../models/ParkingArea');
const responseWrapper = require('../config/responseWrapper');

module.exports = {
  getAll: (req, res, next) => {
    ParkingArea.find((err, parkingAreas) => {
      if (err) return res.status(500).send(responseWrapper(null, 'Failed get all Parking Areas', 500));
      res.status(200).send(responseWrapper(
        parkingAreas,
        'Successfully get all Parking Areas',
        200
      ));
    });
  },

  insertParkingArea: async (req, res, next) => {
    const parkArea = new ParkingArea({
      name: req.body.name,
      price: req.body.price,
      slotAvailable: req.body.slotAvailable,
      distance: req.body.distance,
      detail: req.body.detail,
      open: req.body.open,
      close: req.body.close,
      address: req.body.address,
    });

    parkArea.save((err, parking) => {
      if (err) { 
        console.log(err); 
        return res.status(500).send(responseWrapper(null, 'Failed Add Parking Area', 500));
      }
      res.status(200).send(responseWrapper(
        { Message: 'Parking Area was added successfully!' },
        'Parking Area was added successfully!',
        200
      ));
    });
  }
}