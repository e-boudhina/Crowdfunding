const mongoose = require('mongoose')

var furnitureInfoSchema = new mongoose.Schema({
        furniture: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Furniture'
        },
    quantity: Integer
    }
)

module.exports = mongoose.model('FurnitureInfo', furnitureInfoSchema , 'FurnitureInfo')
