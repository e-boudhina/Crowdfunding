var mongoose = require('mongoose');

var certificateSchema = new mongoose.Schema({
name:String , 
chapters:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chapter"
}]
},
{ timestamps: true })
module.exports = mongoose.model('Certificate', certificateSchema,'Certificates')