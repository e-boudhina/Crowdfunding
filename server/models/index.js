const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
 
const db = {};
db.mongoose = mongoose;

//db.Image = require("./Image/image.model")

db.Events= require("./Event/Event.model")


module.exports = db;