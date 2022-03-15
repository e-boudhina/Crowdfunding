var mongoose = require('mongoose');



var EventSchema = new mongoose.Schema({
    EventDescription: String ,
    EventName: String ,
    StartDate: Number,
    EndDate: Number,
    NbParticipants:String,
    Rating:String,
    Status:String
    //EventImage:String  
}

    )


module.exports = mongoose.model('Events' , EventSchema) ;