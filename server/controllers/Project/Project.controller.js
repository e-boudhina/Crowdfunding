const db = require("../../models");
var fs = require('fs');
const uploader = require("../../ImageUploader");
const Image = require("../../models/Image/image.model");
const Project = db.Project;
const User = db.user;
const organization = db.organization;






exports.Project = (req, res) => {
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


// exports.ProjectAdd = (req, res) => {



//   const project = new Project({
//       labelproject: req.body.labelproject,
//       projectdescriptiob: req.body.projectdescriptiob,
//       fundneeded: req.body.fundneeded,
//       fundcollected: req.body.fundcollected,
//       img: req.params.id
//   });
//   project.save((err, project) => {
//     if (err) {
//       res.status(500).send({ message: err });
//     }
//     else {

//        res.status(200).send({message:"Project was created succesfully "})

//       // res.send(project)
//     }
//   });

//   };

//     exports.ProjectUpdate = (req, res) => {

// Project.findOneAndUpdate({_id:req.params.id},{$set:{

//   labelproject: req.body.labelproject,
//   projectdescriptiob: req.body.projectdescriptiob,
//   fundneeded: req.body.fundneeded,
//   fundcollected: req.body.fundcollected


// }
// }).then(result=>{
//   res.status(200).json({updated_product:result})


// })
// .catch(err=>{
// console.log(err);
// res.status(500).json({error:erreur})

// })

//       };







exports.Projectdelete = (req, res) => {
  console.log(req.params);
  console.log(req.params.id);
  Project.findOneAndDelete({ _id: req.params.id },
    (err, result) => {
      if (result) {
        console.log('got deleted');
        res.send("got deleted successfully")
      } else {

        res.send(err)
      }

    })
}


exports.getProjectByid = (req, res) => {
  Project.find({ _id: req.params.id }, (err, result) => {
    if (err) {
      res.json(err);
    }
    else {
      console.log(result);
      res.json(result)
    }
  });
};



exports.getProjectOfOrg = (req, res) => {
  organization.find({ _id: req.params.id }, (err, project) => {
    if (err) {
      res.json(err);
    }
    else {
      // console.log(organization.Projects);            // The below two lines will add the newly saved review's 
      // ObjectID to the the User's reviews array field


      res.json(organization[0].Projects);
    }
  });
};




exports.addProjectToOrg = (req, res) => {

  organization.findOne({_id:req.params.id},(err, organisation)=>{
    if(err){
    res.json(err);
    }
    else{ 
      console.log(req.params.idProject);
      Project.findOne({_id:req.params.idProject},(err, project)=>{
        if(err){
        res.json(err);
        }
        else{ 
          // console.log(organisation[0]);
          console.log(organisation.projects);
organisation.projects.push(project);
organisation.save();
            res.json({ message: 'project  added to an anorganization ' });
            
        }})
      
         
  
  
           // The below two lines will add the newly saved review's 
  // ObjectID to the the User's reviews array field
}
    });


};