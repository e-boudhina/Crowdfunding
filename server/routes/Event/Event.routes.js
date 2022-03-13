const { authJwt } = require("../../middlewares");
const controller = require("../../controllers/Event/Event.controller");
const db = require("../../models");
const Event = db.Event;

var multer = require('multer');
  
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
  
var upload = multer({ storage: storage });



module.exports = function(app) {


app.get("/api/event/all",controller.Project);
//  app.post("/api/test/add",controller.AddEvent);
 app.post("/api/event/add",upload.single('Image'),(req, res) => {  
 const event = new Event({
    EventName: req.body.EventName,
    EventDescription: req.body.EventDescription,
      EndDate: req.body.EndDate,
      StartDate: req.body.StartDate,
    EventImage: req.params.id
 });
 event.save((err, event) => {
   if (err) {
     res.status(500).send({ message: err });
   }
   else {
       
      res.status(200).send({message:"Event was created succesfully "})
      
     // res.send(event)
   }
 })})

 app.delete("/api/event/delete/:id",controller.Eventdelete);
 app.put("/api/event/delete/:id",controller.EventUpdate);

  };