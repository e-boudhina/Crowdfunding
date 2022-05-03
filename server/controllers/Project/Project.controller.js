const db = require("../../models");
var fs = require('fs');
const uploader = require("../../ImageUploader");
const paginationPipeline = require("../../helpers/paginationPipeline");
// const convert = require("crypto-convert");
const Image = require("../../models/Image/image.model");
const Project = db.Project;
const User = db.user;
const organization = db.organization;
var arrayList = require('array-list')
const ethPrice = require('eth-price');
const convert = require("crypto-convert");

// exports.getProjects = async (req, res) => {
//   const {page = "1", keyword = "", ...restOfQuery} = req.query;

//   if (keyword !== "")
//     restOfQuery.labelproject = new RegExp(
//       keyword.text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&") || "",
//       "gi"
//     );

//   try {
//     const projects = await Project.aggregate(
//       paginationPipeline({
//         page,
//         filter: restOfQuery,
//         pageLimit: 1,
//       })
//     );
//     console.log(projects);
//     res.send(projects?.[0] || emptyPaginationPayload);
//   } catch (error) {
//     res.status(500).send({message: error.message, stack: error.stack});
//   }
// };


exports.Project = (req, res) => {
  var list = arrayList()

  Project.find({}, (err, result) => {
    if (err) {
      res.json(err);
    }
    else {
      console.log(result);
      result.forEach(element => {
  
        if(element.status===1){
        list.push(element);
        }
        
        });
      res.json(list)
    }
  });
};

exports.getProjectToValidate = (req, res) => {
  var list = arrayList()
  Project.find({}, (err, result) => {

    if (err) {


      res.json(err);
    }
    else {
   



      result.forEach(element => {
        console.log(element);
      
      
        if(element.status===0){
          list.push(element);
        }
      
      });
      res.json(list);
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
  var list = arrayList()
  
  organization.findOne({ _id: req.params.id }).populate("projects")
  .exec(

    function (err, organisation) {
      if (err) return handleError(err);
  
    
organisation.projects.forEach(element => {
  
if(element.status===1){
list.push(element);
}

});
res.json(list)
      // prints "The author is Ian Fleming"
    }



);
// res.json(list)

}
exports.validateProject = (req, res) => {
  var list = arrayList()
  
  Project.findOne({ _id: req.params.id })
  .exec(

    function (err, project) {
      if (err) return handleError(err);
  
      project.status=1;
      project.save();


      // prints "The author is Ian Fleming"
    }



);
res.json({message:'validation done successfully'})

}
exports.ignoreProject = (req, res) => {
  var list = arrayList()
  
  Project.findOne({ _id: req.params.id })
  .exec(

    function (err, project) {
      if (err) return handleError(err);
  
      project.status=2;
      project.save();


      // prints "The author is Ian Fleming"
    }



);
res.json({message:'Ignorance done successfully'})

}


exports.geyFollowersOfOrg = (req, res) => {
  var list = arrayList()
  
  organization.findOne({ _id: req.params.id }).populate("userFollowing")
  .exec(

    function (err, organisation) {
  
  console.log(organisation);
  console.log(organisation.userFollowing);
  
  organisation.userFollowing.forEach(element => {
    console.log(organisation);
    

list.push(element);




});
// list.push(list.length);
// res.send({message:list.length})
res.json(list)
      // prints "The author is Ian Fleming"
    }



);
// res.json(list)

}


exports.updateProjectFundRaised =(req, res) => {
  
  Project.findOne({ _id: req.params.id }, (err, project) => {
    if (err) {
      res.json(err);
    }
    else {
      // console.log(result);
      console.log(req.body.priceETH);
      console.log(req.params.id);
      console.log(req.body.project);
       
        
     	//Cache is not yet loaded on application start


	var a =convert.BTC.USD(1);
	var pricInEth =convert.ETH.USD(1);
  var c =	convert.LINK.LTC(5);
	var d =convert.USD.CRO(100);
  
  project.fundcollected+= req.body.priceETH*pricInEth  

  //More readable syntax

        
        project.save();
      res.json(project)
    }
  });
};











 



exports.searchProjects = async (req, res) => {
  // usage : user to consult another user
  const keyword = req.params.keyword;
  console.log("aghh " + keyword);
  try {
    const data = await Project.find({ labelproject: { $regex: keyword } });
    // .populate("roles", "-__v");
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json(error.message);
  }
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