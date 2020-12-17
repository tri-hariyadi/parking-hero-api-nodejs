const express = require('express');
const router = express.Router();
const { verifySignUp } = require('../middlewares');
const { authJwt } = require('../middlewares');


const userManagement = require('../controllers/userManagementController');

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});
console.log(verifySignUp.checkDuplicateUsernameOrEmail);
router.post('/register', [verifySignUp.checkDuplicateUsernameOrEmail], userManagement.registerUser);
router.post('/login', userManagement.loginUser);

module.exports = router;
