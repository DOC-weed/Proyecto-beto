const express = require('express');
const app = express();
app.use('/customer', require('./customers'));
app.use('/rentals', require('./rentals'));
module.exports = app;