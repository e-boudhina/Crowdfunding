const mongoose = require('mongoose')

var userRequestSchema = new mongoose.Schema({
        /* if you are going to add something about office space you must add a custom field and make
            furniture optional and test on it when creating if its there then its custom -
            maybe even make another model for office space  that can be either furnished based on the number of employees or not furnished if the user selects to opt out from it
         */
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    incubatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    //     userId: String,
    //     incubatorId: String,
        desired_Location: String,
        preferred_Starting_Date: Date,
        expected_Ending_Date: Date,
        number_Of_Employees: Number,
        furnished_Requirement: Boolean,
        furniture: [{
            //I have tried so many times and in different ways to make this work, this was the only way I managed to do it, and I can not explain why it works
            furnitureId:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Furniture"
            },
            quantity: Number
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
