const mongoose = require("mongoose");

// Declare the Schema of the Mongo model
var donationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Projects' },

    money: Number,
    email:String,
    operation: Number ,
    adresseCryptoDonateur:String,
    adresseCryptoProject: String


  



});

//Export the model
module.exports = mongoose.model('Donation', donationSchema);

