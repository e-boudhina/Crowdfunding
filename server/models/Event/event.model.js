var mongoose = require('mongoose');

var EventSchema = mongoose.Schema(
    {
        EventName: { type: String, required: true },
        EventDescription: { type: String, required: true },
        picture: { type: String, required: true },
        StartDate: { type: String, required: true },
        EndDate: { type: String, required: true },
    },
    { timestamps: true },
);
module.exports = new mongoose.model('Event', EventSchema, 'Event');