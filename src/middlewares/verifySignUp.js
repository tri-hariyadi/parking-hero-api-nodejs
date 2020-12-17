const Users = require('../models/Users');

checkDuplicateUsernameOrEmail = (req, res, next) => {
  Users.findOne({
    username: req.body.username
  }).exec((err, user) => {
    if (err) return res.status(500).send({ message: err });
    if (user) return res.status(400).send({ message: "Failed! Username is already in use!" });

    Users.findOne({
      email: req.body.email
    }).exec((err, user) => {
      if (err) return res.status(500).send({ message: err });
      if (user) return res.status(400).send({ message: "Failed! Email is already in use!" });
      next();
    });
  });
}

const verifySignUp = {
  checkDuplicateUsernameOrEmail
}

module.exports = verifySignUp;
