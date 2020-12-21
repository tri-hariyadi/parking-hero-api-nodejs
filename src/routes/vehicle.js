const express = require('express');
const router = express.Router();
const { uploadSingle, uploadMultiple } = require('../middlewares/multer');
const { authJwt } = require('../middlewares');

const vehicleController = require('../controllers/vehicleRegisteredController');

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept, Authentication"
  );
  next();
});

router.post('/register', uploadSingle, vehicleController.registerVehicle);
router.post('/vehicle_user', [authJwt.verifyToken], vehicleController.getVehicleByUserID);

module.exports = router;
