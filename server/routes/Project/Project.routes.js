const { authJwt } = require("../../middlewares");
const controller = require("../../controllers/Project/Project.controller");
const db = require("../../models");
const Project = db.Project;
const organization = db.organization;
var path = require('path');



var multer = require('multer');
const reqPath = path.join(__dirname, '../../../client/public/Uploads');
console.log(reqPath);
var storage = multer.diskStorage({
  
    destination: (req, file, cb) => {
        cb(null, reqPath)
    },
    filename: (req, file, cb) => {
      console.log(file.fieldname);
        cb(null, file.originalname)
    }
});
  
var upload = multer({ storage: storage });



module.exports = function(app) {


app.get("/api/project/all",controller.Project);
//  app.post("/api/test/add",controller.ProjectAdd);
 app.post("/api/project/add",upload.single('image'),(req, res) => {  
 console.log(req.file);
  const project = new Project({
     labelproject: req.body.labelproject,
     projectdescriptiob: req.body.projectdescriptiob,
     fundneeded: req.body.fundneeded,

     fundcollected: 0,
     Image :req.file.originalname
 });
 project.save((err, project) => {
   if (err) {
     res.status(500).send({ message: err });
     
   }
   else {
    
    

    organization.findOne({_id:req.body.organisation},(err, organisation)=>{
      if(err){
      res.json(err);
      }
      else {
       
organisation.projects.push(project);
organisation.save();
            res.json({ message: 'project  added to an anorganization ' });
      }

    
     



      // res.status(200).send({message:"Project was created succesfully "})
    })
     // res.send(project)
   }
 }
 )
}
 
 )

 app.delete("/api/project/delete/:id",controller.Projectdelete);
 app.put("/api/project/update/:id",upload.single('image'),(req, res) => {
  
  Project.findOneAndUpdate({_id:req.params.id},{$set:{
  

    
    labelproject: req.body.labelproject,
    projectdescriptiob: req.body.projectdescriptiob,
    fundneeded: req.body.fundneeded,
    fundcollected: req.body.fundcollected,
    Image :req.file.originalname
  
  
  }
  }).then(result=>{

    res.status(200).json({updated_product:result})
  

  })
  .catch(err=>{
  console.log(err);
  res.status(500).json({error:erreur})
  
  })
  
 })
        
app.get("/api/project/get/:id",controller.getProjectByid);
app.get("/api/project/getProjectOfOrg/:id",controller.getProjectOfOrg);
app.post("/api/project/addProjectToId/:id/:idProject",controller.addProjectToOrg);
app.get("/api/project/searchProjects/:keyword",controller.searchProjects);
app.get("/api/project/getFollowersOfOrg/:id",controller.geyFollowersOfOrg);







//  app.get( "/api/test/inc",controller.IncubatorBoard );
// app.get("/api/test/admin", [authJwt.verifyToken, authJwt.isAdmin],  controller.adminBoard );
  };

