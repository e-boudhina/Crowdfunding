var mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

var certificateSchema = new mongoose.Schema({
name:String , 
tutor: String,
published : Boolean,
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
certificateSchema.plugin(mongoosePaginate);
module.exports =mongoose.model('Certificate', certificateSchema,'Certificates')