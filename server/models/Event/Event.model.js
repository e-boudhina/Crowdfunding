var mongoose = require('mongoose');



var EventSchema = new mongoose.Schema({
    EventDescription: String ,
    EventName: String ,
    StartDate: String,
    EndDate: String,
 //   NbParticipants:String,
   // Rating:String,
   // Status:String
    //EventImage:String  
}

    )


module.exports = mongoose.model('Events' , EventSchema) ;