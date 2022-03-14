const { verifySignUp } = require("../../middlewares");
const controller = require("../../controllers/User/auth.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    }); //setheader then do request 
    app.post("/api/auth/signup",[ verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted],
        controller.signup );
   
    app.post("/api/auth/signin", 
        controller.signin);
    };
