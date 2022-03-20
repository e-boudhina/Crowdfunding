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
const {errorHandler} = require('./middlewares/Error/error_Middleware')
connectDB()


const port = process.env.PORT || 5001 ;

var app = express();
var corsOptions = {
    origin: "*"
};
app.use(cors(corsOptions));

// The 2 following line are called middlewares
// Accepting only body type format (Content-type: json)
app.use(express.json());
//We will only accept form url encoded ( NOT raw/binary/form-data)
app.use(express.urlencoded({ extended: false }));

require("./routes/User/auth.routes")(app);
require("./routes/User/user.routes")(app);

require('./routes/User/auth.routes')(app);
require('./routes/User/user.routes')(app);

// overriding express default error handler that return text/html( express assumes BY DEFAULT that you are using blade or twig templating engine)
//It needs to be be defined after routes or else it will not work
app.use(errorHandler)

// I do not understand this line
  init_functions.initRoles();

app.listen(port, () => `Server running on port ${port} `);

module.exports = app;
