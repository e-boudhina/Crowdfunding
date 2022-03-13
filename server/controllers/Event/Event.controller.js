const db = require("../../models");
var fs = require('fs');
const uploader = require("../../ImageUploader");
const Image = require("../../models/Image/image.model");
const Project = db.Project;
const User = db.user;
const organization = db.organization;

exports.Events = (req, res) => {
    Project.find({}, (err, result) => {
        if (err) {
            res.json(err);
        }
        else {
            console.log(result);
            res.json(result)
        }
    });
};

//exports.AddEvent = (req, res) => {
  


    //   const event = new Event({
    //       EventName: req.body.EventName,
    //      EventDescription: req.body.EventDescription,
    //       EndDate: req.body.EndDate,
    //       StartDate: req.body.StartDate,
    //       EventImage: req.params.id
    //   });


   
    //   event.save((err, event) => {
    //     if (err) {
    //       res.status(500).send({ message: err });
    //     }
    //     else {
            
    //        res.status(200).send({message:"Project was created succesfully "})
           
    //       // res.send(event)
    //     }
    //   });
  
    //   };

exports.EventUpdate = (req, res) => {

    Project.findOneAndUpdate({ _id: req.params.id }, {
        $set: {

            EventName: req.body.EventName,
            EventDescription: req.body.EventDescription,
            StartDate: req.body.StartDate,
            EndDate: req.body.EndDate,
            EventImage: req.body.EventImage


        }
    }).then(result => {
        res.status(200).json({ updated_product: result })


    })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: erreur })

        })

    const event = new Event({
        EventName: req.body.EventName,
        EventDescription: req.body.EventDescription,
          EndDate: req.body.EndDate,
          StartDate: req.body.StartDate,
        EventImage: req.params.id
    });
    project.save((err, project) => {
        if (err) {
            res.status(500).send({ message: err });
        }
        else {

            res.status(200).send({ message: "Event was created succesfully " })

            // res.send(project)
        }
    });

};



exports.Eventdelete = (req, res) => {
    console.log(req.params);
    console.log(req.params.id);
    Project.findOneAndDelete({ _id: req.params.id },
        (err, result) => {
            if (result) {
                console.log('Event deleted');
                res.send("Event deleted successfully")
            } else {

                res.send(err)
            }

        })
}
