var mongoose = require('mongoose');

var ChapterSchema = new mongoose.Schema({
    name:String ,
    nextChapter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chapter"
    },
    content:String
},
{ timestamps: true })
module.exports = mongoose.model('Chapter' , ChapterSchema , 'Chapters') ;
