var mongoose = require('mongoose');
const User = require('./user.model')

const Admin  = User.discriminator( 'Admin', new mongoose.Schema({
    task : String 
}));

module.exports =Admin; 