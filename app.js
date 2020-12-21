const cors = require("cors");
const express = require('express');
const bodyParser = require('body-parser');
const createError = require('http-errors');

const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// database connection  
require('./initDB');

const userManagement = require('./src/routes/userManagement');
const parkingArea = require('./src/routes/parkingArea');
const vehicle = require('./src/routes/vehicle');
const saldo = require('./src/routes/SaldoRoute');

app.use('/api/v1/parkingHero/', userManagement);
app.use('/api/v1/parkingHero/parkingarea', parkingArea);
app.use('/api/v1/parkingHero/vehicle', vehicle);
app.use('/api/v1/parkingHero/saldo', saldo);

//404 handler and pass to error handler
app.use((req, res, next) => {
  next(createError(404, 'Not found'));
});

//Error handler
app.use((err, req, res, next) => {
  console.log('error disisni');
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server started on port ' + PORT + '...');
});
