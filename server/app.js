//var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');
const db = require('./models')
const mongoose = db.mongoose;
const dotenv = require('dotenv').config();
const init_functions = require('./utils/init_functions')
var imgModel = require('./models/Image/image.model');
var fs = require('fs');
const striperoutes = require('./routes/stripe-route');
const connectDB = require('./config/db')
const color = require('colors')
const { errorHandler } = require('./middlewares/Error/error_Middleware')
connectDB()

const port = process.env.PORT || 5001;

var app = express();
var corsOptions = {
    origin: "*"
};
app.use(cors(corsOptions));
 
app.set("view engine", "ejs");
let reqPath = path.join(__dirname, '../client/public');

console.log(reqPath);

app.use(express.static(reqPath));
app.use(express.static("public"));


var bodyParser = require('body-parser');

var test;
// The 2 following line are called middlewares
// Accepting only body type format (Content-type: json)
app.use(express.json());

//We will only accept form url encoded ( NOT raw/binary/form-data)
app.use(express.urlencoded({ extended: true }));
app.use('/api/stripe', striperoutes);
require('./routes/User/auth.routes')(app);
require('./routes/User/user.routes')(app);

//Project routes
require('./routes/Project/Project.routes')(app);
require('./routes/Donation/Donation.routes')(app);
require('./routes/Organization/Organization.routes')(app);

require('./routes/Learning/learning.routes')(app);
require('./routes/event/events.routes')(app);


//Services routes
app.use('/api/furniture', require('./routes/Services/furniture.routes'))
app.use('/api/userRequests', require('./routes/Services/userRequests.routes'))

// overriding express default error handler that return text/html( express assumes BY DEFAULT that you are using blade or twig templating engine)
//It needs to be be defined after routes or else it will not work
app.use(errorHandler);
init_functions.initRoles();

app.listen(port, () => `Server running on port ${port} `);

module.exports = app;
