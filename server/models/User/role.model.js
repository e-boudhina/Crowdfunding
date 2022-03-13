var mongoose = require('mongoose');

var RoleSchema = new mongoose.Schema({
    name: String
})

module.exports = mongoose.model('Role' , RoleSchema , 'Roles') ;
