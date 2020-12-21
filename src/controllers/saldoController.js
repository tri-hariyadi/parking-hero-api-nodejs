const Saldo = require('../models/Saldo');
const Users = require('../models/Users');
const responseWrapper = require('../config/responseWrapper');

module.exports = {
  createSaldo: async (req, res, next) => {
    const { nominal, userId } = req.body;
    Users.findOne({ 
      _id: userId 
    }).exec((err, user) => {
      console.log(user);
      if (err) return res.status(500).send(responseWrapper(null, 'Error when find user by id', 500));
      if (!user) return res.status(404).send(responseWrapper(null, 'User not found', 404));
      Saldo.create({
        nominal,
        userID: user._id
      }).then(async saldo => {
        // console.log(saldo);
        await Users.updateOne({ saldoId: saldo.id });
        res.status(200).send(responseWrapper(null, 'Success add saldo account', 200));
      }).catch(err => {
        console.log(err)
        res.status(500).send(responseWrapper(null, 'Failed create saldo account', 500));
      })
    })
  },

  getSaldoByUserId: async (req,res, next) => {
    const { userId } = req.body;

    Saldo.findOne({ userID: userId }).exec((err, saldo) => {
      if (err) return res.status(500).send(responseWrapper(null, 'Error when find saldo by user id', 500));
      console.log(saldo);
      res.status(200).send(responseWrapper(
        saldo,
        'Success get saldo',
        200
      ))
    })
  }
}
