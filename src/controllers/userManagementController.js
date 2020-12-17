const config = require("../config/config").get(process.env.NODE_ENV);
const Users = require("../models/Users");
const responseWrapper = require('../config/responseWrapper');

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

module.exports = {
  registerUser: async (req, res, next) => {
    const user = new Users({
      username: req.body.username,
      email: req.body.email,
      phonenumber: req.body.phonenumber,
      password: bcrypt.hashSync(req.body.password, 8)
    });

    if (!parseInt(user.phonenumber, 10)) return res.status(400).send(responseWrapper(
      null,
      'Invalid phone number!',
      400
    ));

    user.save((err, user) => {
      if (err) return res.status(500).send(responseWrapper(null, err, 500));
      res.status(200).send(responseWrapper(
        { Message: 'User was registered successfully!'}, 
        'User was registered successfully!', 
        200
      ));
    });
  },

  loginUser: async (req, res, next) => {
    Users.findOne({
      username: req.body.username
    }).exec((err, user) => {
      if (err) return res.status(500).send(responseWrapper(null, err, 500));

      if (!user) {
        Users.findOne({
          email: req.body.username
        }).exec((err, userEmail) => {
          if (err) return res.status(500).send(responseWrapper(null, err, 500));

          if (!userEmail) {
            return res.status(404).send(responseWrapper(null, 'Username is not found', 404));
          }

          var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            userEmail.password
          );

          if (!passwordIsValid) {
            return res.status(401).send(responseWrapper(
              null,
              'Invalid password',
              401
            ));
          }

          var token = jwt.sign({
            idUser: userEmail.id,
            username: userEmail.username,
            email: userEmail.email,
            phonenumber: userEmail.phonenumber
          }, config.SECRET, {
            expiresIn: 86400 // 24 hours
          });

          res.status(200).send(
            responseWrapper({ accessToken: token }, 'Success Login', 200)
          );
        });
      } else {
        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );

        if (!passwordIsValid) {
          return res.status(401).send(responseWrapper(
            null,
            'Invalid password',
            401
          ));
        }

        var token = jwt.sign({
          idUser: user.id,
          username: user.username,
          email: user.email,
          phonenumber: user.phonenumber
        }, config.SECRET, {
          expiresIn: 86400 // 24 hours
        });

        res.status(200).send(
          responseWrapper({ accessToken: token }, 'Success Login', 200)
        );
      }
    });
  }
}
