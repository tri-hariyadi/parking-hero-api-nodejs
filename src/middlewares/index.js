const authJwt = require('./authJwt');
const verifySignUp = require('./verifySignUp');
const uploadPhoto = require('./multer') 

module.exports = {
  authJwt,
  verifySignUp,
  uploadPhoto
};
