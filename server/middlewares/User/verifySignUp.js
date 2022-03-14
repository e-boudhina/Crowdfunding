const db = require("../../models");
const ROLES = db.ROLES;
const User = db.user;
const asyncHandler = require('express-async-handler')

//The methods defined in here are also middlewares since they contain next meaning handling or verifying the request before letting the request proceed by writing (next)
 const checkDuplicateUsernameOrEmail =  asyncHandler(async (req, res, next) => {
  const {username, email} = req.body
  //check for email
  if(!username ||!email ){
    res.status(400)
    throw new Error('Checking for duplicate username and emails Middleware can not run without providing a username or email')
  }

    // Username
    User.findOne({
      username: req.body.username
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (user) {
        res.status(400).send({ message: "Failed! Username is already in use!" });
        return;
      }
      // Email
      User.findOne({
        email: req.body.email
      }).exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        if (user) {
          res.status(400).send({ message: "Failed! Email is already in use! "+user });
          return;
        }
        next();
      });
    }); 
  }
);

  const checkRolesExisted =  asyncHandler(async (req, res, next) => {
        const {roles} = req.body
        //check for email
        if(!roles ){
          res.status(400)
          throw new Error('Checking for roles existence Middleware can not run without providing roles')
        }

    if (req.body.roles) {
      for (let i = 0; i < req.body.roles.length; i++) {
        if (!ROLES.includes(req.body.roles[i])) {
          res.status(400).send({
            message: `Failed! Role ${req.body.roles[i]} does not exist!`
          });
          return;
        }
      }
    }
    next();
  }
  );

  const verifySignUp = {
    checkDuplicateUsernameOrEmail,
    checkRolesExisted
  };

  module.exports = verifySignUp;
