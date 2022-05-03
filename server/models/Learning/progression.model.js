const mongoose = require('mongoose'); 
const mongoosePaginate = require('mongoose-paginate-v2');
// Declare the Schema of the Mongo model
var progressionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    certificate: { type: mongoose.Schema.Types.ObjectId, ref: 'Certificate' },
    currentChapter: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' },
    isCompleted: Boolean,
});
progressionSchema.plugin(mongoosePaginate);
//Export the model
module.exports = mongoose.model('Progression', progressionSchema);