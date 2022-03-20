const jwt = require("jsonwebtoken");
//const config = require("../config/auth.config.js");
const db = require("../../models");
const User = db.user;
const Role = db.role;

// first , we verify if token is valid
verifyToken = (req, res, next) => {

  //Token is being send as parameter in the headers x-access-token
  // You can switch this method and use "Authorisation header" sent in in the form 'Bearer ${token}'. However that will required some changed in the function to extract the token
  // console.log(req.headers)
    let token = req.headers["x-access-token"];
    if (!token) {
      return res.status(403).send({ message: "No token provided!" });
    }
    jwt.verify(token, process.env.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
      }
      req.userId = decoded.id;
      next();
    });
  };

  //Then we verify roles

  isAdmin = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      Role.find(
        {
          _id: { $in: user.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "admin") {
              next();
              return;
            }
          }
          res.status(403).send({ message: "Require Admin Role!" });
          return;
        }
      );
    });
  };

  isIncubator = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      Role.find(
        {
          _id: { $in: user.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "incubator" || roles[i].name === "admin") {
              next();
              return;
            }
          }
          res.status(403).send({ message: "Require Incubator Role!" });
          return;
        }
      );
    });
  };

  const authJwt = {
    verifyToken,
    isAdmin,
    isIncubator
  };
  module.exports = authJwt;
