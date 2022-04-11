var mongoose = require('mongoose');

var certificateSchema = new mongoose.Schema({
name:String , 
tutor: String,
img:
{
    data: String,
    contentType: String
},
category: { type: mongoose.Schema.Types.ObjectId, ref: 'Categorylearning' },
chapters:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chapter"
}]
},
{ timestamps: true })
module.exports = mongoose.model('Certificate', certificateSchema,'Certificates')