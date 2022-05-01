const jwt = require("jsonwebtoken");
const config = require("../../config/auth.js")
const db = require("../../models");
const User = db.user;
const Role = db.role;

// first , we verify if token is valid
verifyToken = (req, res, next) => {

  //THe token is being send as parameter in the headers x-access-token
  // You can switch this method and use "Authorisation header" sent in in the form 'Bearer ${token}'. However that will require some changes in the function to extract the token
  // console.log(req.headers)
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Token not valid! " + config.secret });
    }
    //This line below is extremely important, instead of sending both the "token" and the "user id" from the local storage you simply send the token.
    // The token itself belongs to a user when you use the decode function it will send back the userId of that token or even the user if you want it to
    req.userId = decoded.id; // please make sure that it is in the headers and not in the body
    // currently there are 3 arguments in the decoded Id, iat and exp, is it possible to add more
    //   return res.status(200).json(
    //       {
    //         message: decoded
    //       }
    //   )
    //req.userRoles = decoded.roles;
    /* example request:
    when yo console log a request you will find a lot of information, you are going to most likely use headers, params or body to pull data from a form
    excerpt of example of console log:
    ...
    headers: {
    'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzMyZDU1ZjMzMGEyZjU3N2E3ZjU2YSIsImlhdCI6MTY1MDIxNTg4MCwiZXhwIjoxNjUwMzAyMjgwfQ.7pRNA-h4ib9OYJ-JS0aGxc4kOJor9ZFUMFt
    N_QEgYz4',
    incubatorid: '62332d55f330a2f577a7f56a',
    'user-agent': 'PostmanRuntime/7.29.0',
    accept: '',
    'cache-control': 'no-cache',
    ...
        ... then at the bottom you will find this
        body: {},
       route: Route {
        path: '/approve/:userRequestId',
        methods: { post: true }
  },
        userId: '62332d55f330a2f577a7f56a',                    <================== this is the result of "eq.userId = decoded.id" it does NOT belong to BODY or PARAMS nor the HEADERS
  },
     */
    // res.currentUser = await User.findOne(decode.id);
    //Proceed to next middleware if it exists or move on to the controller for the request to be processed
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
              //Adding field to request
              //req.isIncubator = true
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
