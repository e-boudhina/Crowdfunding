const mongoose = require('mongoose')

var userRequestSchema = new mongoose.Schema({

    userId: String,
    incubatorId: String,
    desired_Address: String,
    furniture: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "FurnitureInfo",
    }

    ],
    status: Boolean

    //Later you make include a pdf file so that the user demonstrates his eagerness by providing supporting documents

    //Try to find out how to use methods to find the user based on the id  using models class methods? or is it even possible
   // Method like getting the user or the the incubator or the address should be implemented either here or in the controller
}, {
                     timestamps: true
                    }
)

module.exports = mongoose.model('userRequest', userRequestSchema, 'userRequest')
