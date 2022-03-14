//var createError = require('http-errors');
var express = require('express');
var  cors = require('cors');
var path = require('path');
const db = require('./models')
const mongoose =db.mongoose ; 
const  dotenv = require('dotenv').config();
const init_functions = require('./utils/init_functions')
const connectDB = require('./config/db')
const color = require('colors')

connectDB()


const port = process.env.PORT || 5001 ;

var app = express();
var corsOptions = {
    origin: "*"
};
app.use(cors(corsOptions));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));


require('./routes/User/auth.routes')(app);
require('./routes/User/user.routes')(app);

// menich fehemha hethi
  init_functions.initRoles();

  app.listen(port , () => `Server running on port ${port} `);

module.exports = app;
