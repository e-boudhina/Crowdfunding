const db = require("../../models");
var fs = require('fs');
const uploader= require("../../ImageUploader");
const Image= require("../../models/Image/image.model");
const asyncHandler = require("express-async-handler");
var arrayList = require('array-list')


// const { default: organisationReducers } = require("../../../client/src/reducers/Organisations/organisation.reducers");
const Project = db.Project;
const User = db.user;
const organization = db.organization;


exports.addProjectToOrganization = (req, res) => {
Project.find({_id:req.params.idProject},(err, result)=>{
    if(err){
    res.json(err);
    }
    else{ 
        const Project1=result[0];
        console.log(Project1);
        organization.findOne({ _id:req.params.idOrganization}, (err, organization) => {
            if (organization) {
                 // The below two lines will add the newly saved review's 
              console.log(organization.Projects);           // The below two lines will add the newly saved review's 
                // ObjectID to the the User's reviews array field
                organization.Projects.push(Project1);
              
                organization.save();
                res.json({ message: 'project added to an organization' });
            }
        });
    }
        })
  };


exports.unfollowOrganization = (req, res) => {
organization.find({_id:req.params.id},(err, result)=>{
    if(err){
    res.json(err);
    }
    else{ 
        const organization1=result[0];
        console.log(organization1);
  User.findOne({ _id:req.params.idUser}, (err, user) => {
            if (user) {
              console.log(user);            // The below two lines will add the newly saved review's 
              console.log(user.aa);           // The below two lines will add the newly saved review's 
                // ObjectID to the the User's reviews array field
                user.aa.pull(organization1);
                organization1.userFollowing.pull(user);
                user.save();
                organization1.save();
                res.json({ message: 'user unfollowing organization ' });
            }
        });
        



    }
        })

  
  
  };

exports.followOrganization = (req, res) => {
  // console.log( req.params.id);
  // console.log( req.params.idUser);
 
   
organization.find({_id:req.params.id},(err, result)=>{
    if(err){
    res.json(err);
    }
    else{ 
        const organization1=result[0];
        // console.log(organization1);
  User.findOne({ _id:req.params.idUser}, (err, user) => {
    var k=0;    
    if (user) {
user.aa.forEach((element)=> {
if(element.equals(organization1._id)){

  k=1
}



}

)
console.log(k);
if (k===0) {
  
  console.log(user);            // The below two lines will add the newly saved review's 
  console.log(user.aa);           // The below two lines will add the newly saved review's 
    // ObjectID to the the User's reviews array field
    user.aa.push(organization1);
    organization1.userFollowing.push(user);
    user.save();
    organization1.save();
    res.json({ message: 'followed '+organization1.name+' '+'successfully' });



}else{

  res.json({ message: 'You already followed '+organization1.name});
}



;



            }

        });

    }
        })
    }



exports.isFollowed = (req, res) => {
  // console.log( req.params.id);
  // console.log( req.params.idUser);
 
   
User.findOne({_id:req.params.idUser},(err, user)=>{
    if(err){
    res.json(err);
    }
    else{ 
        // console.log(organization1);
 organization.findOne({ _id:req.params.id}, (err, organisation) => {
    var k=0;    


    user.aa.forEach((element)=> {
      if(element.equals(organisation._id)){
      
        res.json({ Isfollowed: true}); 
      }
      else{
        res.json({ Isfollowed: false }); 
        
      }




        });

    })
        }
      })
    }



    exports.getUser = (req, res) => {
      // usage : user to consult another user
      console.log("user controller 111 username searched : "+ req.params.username);
      const username = req.params.username
     User.findOne({ username: username }).then
            (data => {
              if (!data)
                res.status(404).send({ message: "Not found Tutorial with id " + username });
              else res.send(data);
            })
            .catch(err => {
              res
                .status(500)
                .send({ message: "Error retrieving Tutorial with id=" + username });
            });
          };



exports.addOrganization = (req, res) => {

    const organization1 = new organization();
    organization1.name = req.body.name;
    organization1.email = req.body.email;
    organization1.ownerName = req.body.ownerName;
    organization1.phone=req.body.phone
    organization1.fax=req.body.fax
    organization1.adress=req.body.adress
    organization1.description=req.body.description
    organization1.Secteur=req.body.Secteur
    organization1.save()
      .then((result) => {
        User.findOne({ username: organization1.ownerName }, (err, user) => {
            if (user) {
              console.log(user);            // The below two lines will add the newly saved review's 
                // ObjectID to the the User's reviews array field
                user.organization.push(organization1);
                user.save();
                res.json({ message: 'organization1 created!' });
            }
        });
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  
  
  
  
  };

// fdsdfsd
  exports.deleteOrganization = (req, res) => {
    console.log(req.params);
    console.log(req.params.id);
    organization.findOneAndDelete({_id: req.params.id}, 
                    (err, result) => {
                      if(result){
                      console.log('got deleted');
                      res.send("got deleted successfully")
                      }else{
    
                        res.send(err)
                      }
                    
                    })
                  }  



                  
exports.all = (req, res) => {
    organization.find({},(err, result)=>{
        if(err){
        res.json(err);
        }
        else{
            console.log(result);
        res.json(result)
        }
            });
  };
                  
exports.allForUser = (req, res) => {  
  User.findOne({ _id: req.params.id },{username : 1 }, (err, user) => {
   if (user) {
     console.log(user);            // The below two lines will add the newly saved review's 
        // ObjectID to the the User's reviews array field
        organization.find({ownerName:user.username},(err, result)=>{
          if(err){
          res.json(err);
          }
          else{
              
          res.json(result)
          }
              });
        
   }
  });
  };

  
                  
  exports.allOrganisationOwners = asyncHandler(async (req, res) => {
    var list = arrayList()

    User.find({}, (err, user) => {
      if (user) {
        console.log(user);            // The below two lines will add the newly saved review's 
           // ObjectID to the the User's reviews array field
          //  res.json(user)

user.forEach((element)=>{
if(element.aa.length!=0){
list.push(element)

}

}


  
)
res.json(list)



      }
     
     });
    
    }
     )


                    
exports.getOrgByid = (req, res) => {
    organization.find({_id:req.params.id},(err, result)=>{
        if(err){
        res.json(err);
        }
        else{
            console.log(result);
        res.json(result)
        }
            });
  };

