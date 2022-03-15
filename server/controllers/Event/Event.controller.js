const db = require("../../models");
var fs = require('fs');
//const uploader = require("../../ImageUploader");
//const Image = require("../../models/Image/image.model");
const Event = db.Events;
//const User = db.user;

exports.Events = (req, res) => {
    Event.find({}, (err, result) => {
        if (err) {
            res.json(err);
        }
        else {
            console.log(result);
            res.json(result)
        }
    });
};

exports.EventUpdate = (req, res) => {

    Event.findOneAndUpdate({ _id: req.params.id }, {
        $set: {

            EventName: req.body.EventName,
            EventDescription: req.body.EventDescription,
            StartDate: req.body.StartDate,
            EndDate: req.body.EndDate,
            EventImage: req.body.EventImage,
            Status: req.body.Status,
            Rating: req.body.Rating

        }
    }).then(result => {
        res.status(200).json({ updated_product: result })


    })
        .catch(err => {
            console.log(err);
           // res.status(500).json({ error: erreur })

        })

   
};



exports.Eventdelete = (req, res) => {
    console.log(req.params);
    console.log(req.params.id);
    Event.findOneAndDelete({ _id: req.params.id },
        (err, result) => {
            if (result) {
                console.log('Event deleted');
                res.send("Event deleted successfully")
            } else {

                res.send(err)
            }

        })
}
