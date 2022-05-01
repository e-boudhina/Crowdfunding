const mongoose = require('mongoose'); 
// Declare the Schema of the Mongo model
var progressionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    certificate: { type: mongoose.Schema.Types.ObjectId, ref: 'Certificate' },
    currentChapter: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' },
    isCompleted: Boolean,
});

//Export the model
module.exports = mongoose.model('Progression', progressionSchema);