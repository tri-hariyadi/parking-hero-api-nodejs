module.exports = {
  getAll: (req, res, next) => {
    res.status(200).send({
      data: [
        {
          lat: 2001
        }
      ]
    });
  }
}