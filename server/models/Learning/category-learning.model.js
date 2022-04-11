var mongoose = require('mongoose');

var Categorylearning = new mongoose.Schema({
name:String 
})
module.exports = mongoose.model('Categorylearning', Categorylearning,'Categorylearnings')