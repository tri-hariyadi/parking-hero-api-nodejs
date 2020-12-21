const express = require('express');
const router = express.Router();

const saldoController = require('../controllers/saldoController');

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept, Authentication"
  );
  next();
});

router.post('/create', saldoController.createSaldo);
router.post('/get_saldo', saldoController.getSaldoByUserId);

module.exports = router;
