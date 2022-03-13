const db = require("../../models");
var fs = require('fs');
const uploader= require("../../ImageUploader");
const Image= require("../../models/Image/image.model");
const Project = db.Project;
const User = db.user;
const organization = db.organization;









exports.Project = (req, res) => {
    Project.find({},(err, result)=>{
        if(err){
        res.json(err);
        }
        else{
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

    exports.ProjectUpdate = (req, res) => {
  
Project.findOneAndUpdate({_id:req.params.id},{$set:{

  labelproject: req.body.labelproject,
  projectdescriptiob: req.body.projectdescriptiob,
  fundneeded: req.body.fundneeded,
  fundcollected: req.body.fundcollected


}
}).then(result=>{
  res.status(200).json({updated_product:result})


})
.catch(err=>{
console.log(err);
res.status(500).json({error:erreur})

})

      const project = new Project({
          labelproject: req.body.labelproject,
          projectdescriptiob: req.body.projectdescriptiob,
          fundneeded: req.body.fundneeded,
          fundcollected: req.body.fundcollected,
          img: req.params.id
      });
      project.save((err, project) => {
        if (err) {
          res.status(500).send({ message: err });
        }
        else {
            
           res.status(200).send({message:"Project was created succesfully "})
           
          // res.send(project)
        }
      });
  
      };







            exports.Projectdelete = (req, res) => {
console.log(req.params);
console.log(req.params.id);
                Project.findOneAndDelete({_id: req.params.id}, 
                (err, result) => {
                  if(result){
                  console.log('got deleted');
                  res.send("got deleted successfully")
                  }else{

                    res.send(err)
                  }
                
                })
              }

        

  


  