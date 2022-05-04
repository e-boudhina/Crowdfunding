var mongoose = require('mongoose');
var certificate = require('./certificate.model.js')
var ChapterSchema = new mongoose.Schema({
    name:String ,
    nextChapter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chapter"
    },
    content:String
},
{ timestamps: true })

ChapterSchema.pre("remove", { document: true, query: false }, document => {
    const chapterId = document._id;
    console.log("AAAAAAAAAAAAAAAAAAAA");
    certificate.find({ chapters: { $in: [chapterId] } }).then(chapters => {
        console.log("entered delete chapter middleware with chapter id " + chapterId);
      Promise.all(
        chapters.map(chapter =>
          certificate.findOneAndUpdate(
            chapter._id,
            { $pull: { chapters: chapterId } },
            { new: true }
          )
        )
      );
    });
  });
module.exports = mongoose.model('Chapter' , ChapterSchema , 'Chapters') ;

