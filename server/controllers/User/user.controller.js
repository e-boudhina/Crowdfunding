const asyncHandler = require("express-async-handler");
const db = require("../../models");
const User = db.user;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

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

exports.deleteUser = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to delete can not be empty!"
    });
  }
  const id = req.body.id;
  User.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        console.log("controller : 404 user not found "+ id);
        res.status(404).send({
          message: `Cannot delete User  with id=${id}. Maybe User  was not found!`
        });
      } else {
        res.send({
          message: "User was deleted successfully!"
        });
      }
    })
    .catch(err => {
      
      res.status(500).send({
        message: "Could not delete User with id=" + id
      });
    });
};


exports.updateUserProfile = asyncHandler(async (req, res) => {
  console.log("user.controller.update profile called with id " + req.body.id);
  const user = await User.findOne({
    _id: req.body.id
  }).populate("roles", "-__v");
  if (user) {
    console.log(user);
    user.id = req.body.id ;
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    user.verified = req.body.verified || user.verified;
    user.address = req.body.address || user.address;
    user.password = (req.body.password !== "" || req.body.password)  ?  bcrypt.hashSync(req.body.password, 8) : user.password;
   // user.password = bcrypt.hashSync(req.body.password, 8);
    console.log("crypted pass "+ user.password);
    user.phone = req.body.phone || user.phone;
    // user.pic = req.body.pic || user.pic;
 /*var token = jwt.sign({ id: user.id }, process.env.secret, {
      expiresIn: 86400, // 24 hours
    });*/
    var authorities = [];
    for (let i = 0; i < user.roles.length; i++) {
      authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
    }
    const updatedUser = await user.save();
    res.json(
      {
        user: {
          id: updatedUser._id,
          roles: authorities,
          username: updatedUser.username,
        },
        infos: {
        username: updatedUser.username,
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
          address: updatedUser.address,
          verified: updatedUser.verified,
          email: updatedUser.email,
          phone: updatedUser.phone,
          password: updatedUser.password
        },
        //   pic: updatedUser.pic,
        // isAdmin: updatedUser.isAdmin,
        //  token: generateToken(updatedUser._id),
      }
    );
  } else {
    res.status(404);
    console.log(req.id);
    throw new Error("User Not Found");
  }
});

/*exports.FindAllProfiles = async (req ,res)=>{
    try {
       const data =  await ProfileModel.find(('user', ["firstName","lastName", "email", "role"])
       res.status(200).json(data)

    } catch (error) {
        res.status(404).json(error.message)
    }
}*/
exports.FindSingleProfile = async (req, res) => {
  // usage : user to consult another user
  try {
    const data = await userProfile
      .findById(
        { _id: req.body._id },
        {
          username: 1,
          firstName: 1,
          lastName: 1,
          email: 1,
          address: 1,
          verified: 1,
          roles: 1,
        }
      )
      .populate("roles", "-__v");
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json(error.message);
  }
};
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
