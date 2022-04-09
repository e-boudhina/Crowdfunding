const asyncHandler = require("express-async-handler");
const db = require("../../models");
const User = db.user;
const Role = db.role;
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

  //Add reroute condition if id not found for all requests that require params
  const {userId} = req.params;

  if (!userId) {
    res.status(400);
    throw Error("User Id is required");
  }

  User.findByIdAndRemove(userId)
    .then((data) => {
      if (!data) {
        console.log("controller : 404 user not found " + userId);
        res.status(404).send({
          message: `Cannot delete User  with id=${userId}. Maybe User  was not found!`,
        });
      } else {
        res.send({
          message: "User was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id=" + userId,
      });
    });
};

exports.updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findOne({
    _id: req.body.id,
  }).populate("roles", "-__v");
  if (user) {
    user.id = req.body.id;
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    user.verified = req.body.verified || user.verified;
    user.address = req.body.address;
    user.password =
      req.body.password !== "" || req.body.password
        ? bcrypt.hashSync(req.body.password, 8)
        : user.password;
    user.phone = req.body.phone || user.phone;
    user.birthdate = req.body.birthdate || user.birthdate;

    var authorities = [];
    for (let i = 0; i < user.roles.length; i++) {
      authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
    }
    const updatedUser = await user.save();
    if (updatedUser) {
      console.log(updatedUser);
    }
    res.json({
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
        password: updatedUser.password,
        birthdate: updatedUser.birthdate
      },
    });
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
exports.FindSingleProfile = (req, res) => {
  // usage : user to consult another user
  console.log("user controller 111 username searched : "+ req.params.username);
  const username = req.params.username
 User.findOne(
        { username: username },
        {
          username: 1,
          firstName: 1,
          lastName: 1,
          email: 1,
          address: 1,
          verified: 1,
          phone:1,
          roles: 1,
        }
      ).populate("roles", "-__v").then
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
    
      



exports.searchUsers = async (req, res) => {
  // usage : user to consult another user
  const keyword = req.params.keyword;
  console.log("called " + keyword);
  try {
    const data = await User.find({ firstName: { $regex: keyword } });
    // .populate("roles", "-__v");
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

exports.makeAdmin = asyncHandler(async (req, res) => {
  const {id} = req.params;

  if (!id) {
    res.status(400);
    throw Error("User Id is required");
  }
  Role.findOne({ name: "admin" }, (err, role) => {
    if (err) {
      return res.status(500).send({ message: err });
    } else {

      User.findOne({_id: id}).then((user)=>{

        if (!user){
          return res.status(202).send({
            message: `There is no user with that id!!`
          });
        }
          //return res.status(200).send({ message: user.roles });
            if (user.roles.includes(role._id)) {
              return res.status(500).send({
                message: `User ${user.username} has already been assigned to the role \'${role.name}\'`
              });
            }
            //else
        User.findByIdAndUpdate(
           { _id: id},
           { $push: { roles: role._id } }
        ).then((user)=>{
          console.log(user)
          return res.status(202).send({
            message: `User ${user.username} is now an Admin!`
          });
        })

      }).catch((error)=>{
        //The only error that will be handled here is the Cast to ObjectId failed for value since object id must respect mongo format of  a string containing  12 bytes or a string of 24 hex characters or an integer
        console.log(error)
        return res.status(202).send({
          message: error
        });

      })
      }
    //The old code for reference
   // User.updateOne(
   //    { _id: id},
   //    { $push: { roles: role._id } }
   //  ).then((user)=>{
   //    //Find another way to check if modified using callback
   //    //console.log(user.modifiedCount !=1)
   //    if(user.modifiedCount ===1){
   //      return res.status(200).send({message:"User is  now admin!"})
   //    }
   //       return res.status(200).send({message:"There is no user with that id!"})
   // }
   // ).catch(error =>{
   //      console.log(error)
   //    })

  })
});





exports.makeIncubator = asyncHandler(async (req, res) => {
  const {id} = req.params;

  if (!id) {
    res.status(400);
    throw Error("User Id is required");
  }
  Role.findOne({ name: "incubator" }, (err, role) => {
    if (err) {
      return res.status(500).send({ message: err });
    } else {

      User.findOne({_id: id}).then((user)=>{

        if (!user){
          return res.status(202).send({
            message: `There is no user registered under that id!!`
          });
        }
        //return res.status(200).send({ message: user.roles });
        if (user.roles.includes(role._id)) {
          return res.status(500).send({
            message: `User ${user.username} has already been assigned to the role \'${role.name}\'`
          });
        }
        //else
        User.findByIdAndUpdate(
            { _id: id},
            { $push: { roles: role._id } }
        ).then((user)=>{
          console.log(user)
          return res.status(202).send({
            message: `User ${user.username} is now an Incubator!`
          });
        })

      }).catch((error)=>{
        //The only error that will be handled here is the Cast to ObjectId failed for value since object id must respect mongo format of  a string containing  12 bytes or a string of 24 hex characters or an integer
        console.log(error)
        return res.status(202).send({
          message: error
        });

      })
    }
  })


});


//All code for reference

/*
exports.makeIncubator = asyncHandler(async (req, res) => {
  //return res.status(400).send('here');

  if (!req.body.username) {
    res.status(400);
    throw Error("username is required");
  }

  Role.findOne({name: "incubator"}, (err, role) => {
    if (err) {
      return res.status(500).send({message: err});
    } else {
      //Checking if user already has that role - we can move this to a middleware which will limit and prevent unnecessary requests
      if (user.roles.includes(role._id)) {
        return res.status(500).send({
          message: `User ${req.body.username} has already been assigned to the role \'${role.name}\'`
        });
      }
      console.log("User to be updated " + req.body.username);
      console.log("New Role" + role);
      User.updateOne(
          {username: req.body.username},
          {$push: {roles: role._id}}
          //Why did you put the return result in the exec method?
      ).exec().then((data, success) => {
        res.status(200).send({message: "User is now incubator!"})
      })

    }
  });
});

*/

exports.banUser = asyncHandler(async (req, res) => {
  //return res.status(400).send('here2');
  const {username} = req.params;

  if (!username) {
    res.status(400);
    throw Error("username is required");
  }

User.findOne({username: username }).then((user)=>{
  if (!user)
    return res.status(200).send({
      message: `User \'${username}\' does not exist!`
    });
  if (user.isBanned)
    return res.status(200).send({
      message: `User \'${username}\' is already banned!`
    });
  //else
  user.isBanned =true
  user.save()
  return res.status(202).send({
    message: `User \'${username}\' is now banned!`
  });
  })
  });

exports.unbanUser = asyncHandler(async (req, res) => {
  //return res.status(400).send('here2');
  const {username} = req.params;

  if (!username) {
    res.status(400);
    throw Error("username is required");
  }

  User.findOne({username: username }).then((user)=>{
    if (!user)
      return res.status(200).send({
        message: `User \'${username}\' does not exist!`
      });
    if (!user.isBanned)
      return res.status(200).send({
        message: `User \'${username}\' is already unbanned!`
      });
    //else
    user.isBanned =false
    user.save()
    return res.status(202).send({
      message: `User \'${username}\' is now unbanned!`
    });
  })
});




exports.getUsers = asyncHandler(async (req, res) => {
  adminRole = await Role.findOne({name:'admin'},{name: 1});
  users = await User.find({'roles': {$ne: adminRole._id}},{password :0});

  if (!users) {
    return res.status(200).send({
      message: `There are no user yet!`
    });
  }

    return res.status(200).send({
      users
    });

  }
)


/*exports.DeleteProfile = async (req ,res)=>{
    try {
        const data =  await ProfileModel.findOneAndRemove({_id: req.params.id})
        res.status(200).json({message: "deleted"})
 
     } catch (error) {
         res.status(404).json(error.message)
     }
} */
