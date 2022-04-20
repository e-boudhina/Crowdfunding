const mongoose = require('mongoose')


var furnitureInfoSchema = new mongoose.Schema({
        furnitureId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ListFurniture'
        },
        quantity: Number,
    }
)

module.exports = mongoose.model('FurnitureInfo', furnitureInfoSchema , 'FurnitureInfo')



