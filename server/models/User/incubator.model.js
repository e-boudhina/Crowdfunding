var mongoose = require('mongoose');
const User = require('./user.model');

const Incubator  = User.discriminator( 'Incubator', new mongoose.Schema({
    bio : String 
}));

module.exports =Incubator ;