const express = require('express');
const router = express.Router();
const { authJwt } = require('../middlewares');

const parkingAreaController = require('../controllers/parkingAreaController');
const bookingController = require('../controllers/bookingController');

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept, Authorization"
  );
  next();
});

router.get('/list', [authJwt.verifyToken], parkingAreaController.getAll);
router.post('/insert', [authJwt.verifyToken], parkingAreaController.insertParkingArea);
router.post('/booking', [authJwt.verifyToken], bookingController.booking);

module.exports = router;
