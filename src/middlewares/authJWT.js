const jwt = require('jsonwebtoken');
const config = require('../config/config').get(process.env.NODE_ENV);

verifyToken = (req, res, next) => {
  console.log(req.headers['x-access-token']);
  let token = req.headers['x-access-token'];
  if (!token) return res.status(401).send({ message: 'No token provided!' });
  jwt.verify(token, config.SECRET, (err, decoded) => {
    if (err) return res.status(401).send({ message: "Unauthorized!" });
    req.userId = decoded.id;
    next();
  });
}

const authJwt = {
  verifyToken
}

module.exports = authJwt;
