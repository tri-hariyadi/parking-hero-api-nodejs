const express = require('express');
const router = express.Router();
const { authJwt } = require('../middlewares');

const parkingArea = require('../controllers/parkingAreaController');

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

console.log(authJwt.verifyToken);
router.get('/parking_area', [authJwt.verifyToken], parkingArea.getAll);

module.exports = router;
