//var createError = require('http-errors');
var express = require('express');
var  cors = require('cors');
var path = require('path');
const db = require('./models')
const mongoose =db.mongoose ; 
const  dotenv = require('dotenv').config();
const init_functions = require('./utils/init_functions')

var app = express();
var corsOptions = {
    origin: "*"
  };
const port = process.env.PORT || 5000 ;

app.use(cors(corsOptions));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

require('./routes/User/auth.routes')(app);
require('./routes/User/user.routes')(app);

const uri = process.env.LOCAL_URI ;
//const uri = process.env.MONGO_URI ;
async function run() {
    try {
       mongoose.connect(uri) ;
     console.log("connected");
   //  `MongoDB connected ${conn.connection.host}`.cyan.underline
    } catch (err) {
        console.log(err) ;
    }
  }
  run();



  init_functions.initRoles();

  app.listen(port , () => `Server running on port ${port} `);

module.exports = app;
