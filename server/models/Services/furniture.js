const mongoose = require('mongoose')

var furnitureSchema = new mongoose.Schema({
type: String,
},
    {
        timestamps: true
    }
    )

module.exports = mongoose.model('Furniture', furnitureSchema, 'Furniture')
