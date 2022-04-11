var mongoose = require('mongoose');

var EventSchema = mongoose.Schema(
    {
        EventName: { type: String, required: true },
        EventDescription: { type: String, required: true },
        picture: { type: String, required: true },
        StartDate: { type: Date, required: true },
        EndDate: { type: Date, required: true },
    },
    { timestamps: true },
);
module.exports = new mongoose.model('Event', EventSchema, 'Event');