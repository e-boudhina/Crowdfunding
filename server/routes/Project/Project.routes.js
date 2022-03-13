const { authJwt } = require("../../middlewares");
const controller = require("../../controllers/Project/Project.controller");
const db = require("../../models");
const Project = db.Project;

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


app.get("/api/project/all",controller.Project);
//  app.post("/api/test/add",controller.ProjectAdd);
 app.post("/api/project/add",upload.single('Image'),(req, res) => {  
 const project = new Project({
     labelproject: req.body.labelproject,
     projectdescriptiob: req.body.projectdescriptiob,
     fundneeded: req.body.fundneeded,
     fundcollected: req.body.fundcollected,
     Image :req.file.originalname
 });
 project.save((err, project) => {
   if (err) {
     res.status(500).send({ message: err });
   }
   else {
       
      res.status(200).send({message:"Project was created succesfully "})
      
     // res.send(project)
   }
 })})

 app.delete("/api/project/delete/:id",controller.Projectdelete);
 app.put("/api/project/delete/:id",controller.ProjectUpdate);





//  app.get( "/api/test/inc",controller.IncubatorBoard );
// app.get("/api/test/admin", [authJwt.verifyToken, authJwt.isAdmin],  controller.adminBoard );
  };

