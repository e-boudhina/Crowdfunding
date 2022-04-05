var mongoose = require('mongoose');

const baseOptions = {
    discriminatorKey: 'userType', // our discriminator key, could be anything
 //   collection: 'users', // the name of our collection
  };


var UserSchema = new mongoose.Schema({
    firstName: String ,
    lastName: String ,
    username: String ,
    email: String ,
    verified: Boolean,
    address: String,
    phone: Number,
    password : String,
    birthdate: Date,
    verifyEmailToken: String,
    resetPasswordToken: String,
    resetPasswordExpireToken: Date,
    isBanned: Boolean,
    roles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
    }],
    organization: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "organization"
        }],
    aa: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "organization"
    }],
    img:
    {
        data: Buffer,
        contentType: String
    }
  /*  gorvernorate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Gorvernorate"
    } , */
},baseOptions
)


module.exports = mongoose.model('User' , UserSchema , 'Users') ;
