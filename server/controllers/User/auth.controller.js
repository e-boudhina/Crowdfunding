//const config = require("../config/auth.config");
const db = require("../../models");
const User = db.user;
const Role = db.role;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const asyncHandler = require('express-async-handler')


const signup = asyncHandler(async (req, res) => {

    //Getting form fields
    const {username, email, password} = req.body

    //check if form contains required fields
    if(!username || !email || !password){
        res.status(400)
        throw Error('Please add all fields')
    }


    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        verified: 0,
        address: req.body.address,
        phone: req.body.phone,
        birthdate: req.body.birthdate,
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    });
    user.save((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (req.body.roles) {
        Role.find(
          {
            name: { $in: req.body.roles }
          },
          (err, roles) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            user.roles = roles.map(role => role._id);
            user.save(err => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }
              res.send({ message: "User was registered successfully!" });
            });
          }
        );
      } else {
        Role.findOne({ name: "user" }, (err, role) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          user.roles = [role._id];
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            res.send({ message: "User was registered successfully!" });
          });
        });
      }
    });
  }
  );

  const signin = asyncHandler(async (req, res) => {

          //Getting form fields
          const {username, password} = req.body

          //check if form contains required fields
          if(!username || !password){
              res.status(400)
              throw Error('Please add all fields')
          }

    User.findOne({
      username: req.body.username
    })
      .populate("roles", "-__v")
      .exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }
        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );
        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
          });
        }
        var token = jwt.sign({ id: user.id }, process.env.secret, {
          expiresIn: 86400 // 24 hours
        });
        var authorities = [];
        for (let i = 0; i < user.roles.length; i++) {
          authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
        }
        res.status(200).send({
          user : {  
          id: user._id,
          roles: authorities,
          accessToken: token,
          username: user.username
          ,} ,
  
          infos : {
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            address: user.address,
            verified: user.verified,
            email: user.email,
          }


        });
        
      });
  }
  );
  //Defining the functions as consts than exporting them as an array like this is much easier than exporting them one by one
// you can simply look into module.export and see what are you exporting without scanning the entire file
module.exports = { signup, signin}
