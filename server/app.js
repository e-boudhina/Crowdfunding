//var createError = require('http-errors');
var express = require('express');
var  cors = require('cors');
var path = require('path');
const mongoose = require("mongoose");
const  dotenv = require('dotenv').config();

var app = express();
var corsOptions = {
    origin: "*"
  };
const port = process.env.PORT || 5000 ;

app.use(cors(corsOptions));
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));

// require('./routes/tutorials')(app);

const uri = process.env.LOCAL_URI ;
//const uri = process.env.MONGO_URI ;
async function run() {
    try {
     const conn=  await mongoose.connect(uri) ;
     console.log("connected");
   //  `MongoDB connected ${conn.connection.host}`.cyan.underline
    } catch (err) {
        console.log(err) ;
    }
  }
  run()

  app.listen(port , () => `Server running on port ${port} `);

module.exports = app;
