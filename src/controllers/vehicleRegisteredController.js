const Vehicle = require('../models/Vehicle');
const Users = require('../models/Users');
const responseWrapper = require('../config/responseWrapper');

module.exports = {
  registerVehicle: async (req, res, next) => {
    const param = JSON.parse(req.body.data)
    console.log(param.numberChassis);
    try {
      const newVehicle = new Vehicle({
        vehicleLabel: param.vehicleLabel,
        typeVehicle: param.typeVehicle,
        licensePlate: param.licensePlate,
        numberChassis: param.numberChassis,
        imageUrl: `images/${req.file.filename}`,
        userID: param.userID
      });

      console.log(newVehicle);

      if (!req.file) {
        return res.status(400).send(responseWrapper(null, 'Licence must be uploaded', 400));
      }
      const userVehicle = await Users.findOne({ _id: newVehicle.userID });
      const vehicle = await newVehicle.save();
      userVehicle.vehicleId.push({ _id: vehicle._id });
      await userVehicle.save();

      res.status(200).send(responseWrapper(
        { Message: 'User was registered successfully!' },
        'User was registered successfully!',
        200
      ));
    } catch (error) {
      return res.status(200).send(responseWrapper(null, 'Error: Can not register vehicle', 500));
    }
  },

  getVehicleByUserID: async (req, res, next) => {
    Vehicle.findOne({ userID: req.body.userID }).exec((err, vehicle) => {
      if (err) return res.status(500).send(responseWrapper(null, err, 500));
      if (!vehicle) return res.status(404).send(responseWrapper(null, 'Data is not found', 404))
      res.status(200).send(responseWrapper(vehicle, 'Success get vehicle data', 200));
    });
  }
}
