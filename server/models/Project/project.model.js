var mongoose = require('mongoose');


// const baseOptions = {
//     discriminatorKey: 'userType', // our discriminator key, could be anything
//  //   collection: 'users', // the name of our collection
//   };


var ProjectSchema = new mongoose.Schema({
    labelproject: String ,
    projectdescriptiob: String ,
    fundneeded: Number,
    fundcollected: Number,
  Image:String,
  status:Number,
  dateCreation:Date,
  LieuCreation:String,
  
    // incubator: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "incubator"
    // },
    // incubator: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "incubator"
    // },
}

    )


module.exports = mongoose.model('Projects' , ProjectSchema) ;