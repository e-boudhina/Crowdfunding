const mongoose = require("mongoose");

var OrganisationSchema = new mongoose.Schema({

    name: String,
    email: String,
    phone: Number,
    fax:Number,
    adress:String,
    description:String,
    Secteur: String,
    ownerName:String,
    Image:String,
    userFollowing: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    Projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Projects"
    }]

})

module.exports = mongoose.model('organization' , OrganisationSchema,'Organization') ;
// module.exports = OrganisationModel;