const db = require("../../models");
const User = db.user

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
  };
exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
exports.IncubatorBoard = (req, res) => {
    res.status(200).send("Incubator Content.");
  };


/*exports.FindAllProfiles = async (req ,res)=>{
    try {
       const data =  await ProfileModel.find(('user', ["firstName","lastName", "email", "role"])
       res.status(200).json(data)

    } catch (error) {
        res.status(404).json(error.message)
    }
}*/
exports.FindSingleProfile = async (req ,res)=>{ // usage : user to consult another user 
    try {
        const data =  await userProfile.findById({ _id: req.body._id} , {username:1,firstName:1,lastName:1, email:1 , address:1
           , verified:1 , roles : 1}).populate("roles", "-__v");
        res.status(200).json(data)
 
     } catch (error) {
         res.status(404).json(error.message)
     }
}
//exports.getUser = async (req ,res)=>{  // user : user to refresh its infos
 exports.getUser = (req, res) => {
    User.findById(req.body.id)
      .populate("roles", "-__v")
      .exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }
        var authorities = [];
        for (let i = 0; i < user.roles.length; i++) {
          authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
        }
        res.status(200).send({
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          address: user.address,
          verified: user.verified,
          //roles: authorities
        });
        
      });
  };

/*exports.DeleteProfile = async (req ,res)=>{
    try {
        const data =  await ProfileModel.findOneAndRemove({_id: req.params.id})
        res.status(200).json({message: "deleted"})
 
     } catch (error) {
         res.status(404).json(error.message)
     }
} */