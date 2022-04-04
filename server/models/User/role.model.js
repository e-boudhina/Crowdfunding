var mongoose = require('mongoose');

var RoleSchema = new mongoose.Schema({
    name: String
})
// UserSchema.methods.getRoleName = (id) => {
RoleSchema.methods.getRoleName = function(id) {
   // console.log('getrolename')
    roles = Role.find();
    for(role in roles){
        if (role._id=== id){
            return role.name
        }
    }
}
//What collection stands for
module.exports = mongoose.model('Role' , RoleSchema , 'Roles') ;
