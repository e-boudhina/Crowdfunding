const { authJwt } = require("../../middlewares");
const controller = require("../../controllers/Organization/Organization.controller");
const db = require("../../models");
const User = db.user;
var path = require('path');

const organization = db.organization;




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
app.post("/api/organization/add", upload.single('image'),(req, res) => {

    const organization1 = new organization();
    organization1.name = req.body.name;
    organization1.email = req.body.email;
    organization1.ownerName = req.body.ownerName;
    organization1.phone=req.body.phone
    organization1.fax=req.body.fax
    organization1.adress=req.body.adress
    organization1.description=req.body.description
    organization1.Secteur=req.body.Secteur
    organization1.Image=req.file.originalname
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
  
  
  
  
  }


)







app.put("/api/organization/update/:id",upload.single('image'),(req, res) => {
  
  organization.findOneAndUpdate({_id:req.params.id},{$set:{
  

    
    
    name : req.body.name,
    email : req.body.email,
    phone:req.body.phone,
    fax:req.body.fax,
    adress:req.body.adress,
    description:req.body.description,
    Secteur:req.body.Secteur,
    Image:req.file.originalname,
  
  
  }
  }).then(result=>{
    res.status(200).json({updated_product:result})
  
  
  })
  .catch(err=>{
  console.log(err);
  res.status(500).json({error:erreur})
  
  })
  
 })




app.get("/api/organization/all",controller.all);
app.get("/api/organization/allForUser/:id",controller.allForUser);
app.get("/api/organization/:id",controller.getOrgByid);
app.post("/api/organization/follow/:id/:idUser",controller.followOrganization);
app.post("/api/organization/isFollowed/:id/:idUser",controller.isFollowed);
app.post("/api/organization/addProjectToOrganization/:idOrganization/:idProject",controller.addProjectToOrganization);
app.post("/api/organization/unfollow/:id/:idUser",controller.unfollowOrganization);
app.delete("/api/organization/delete/:id",controller.deleteOrganization);
// app.delete("/api/organization/getUser/:username",controller.getUser);
// app.put("/api/organization/update",controller.getOrganizationByUser);
};