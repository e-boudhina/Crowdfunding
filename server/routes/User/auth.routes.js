const { verifySignUp } = require("../../middlewares");
const controller = require("../../controllers/User/auth.controller");

module.exports = function(app) {

    //This is a middleware it should be moved to a middleware directory
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
    //set header then do request | check roles not necessary
    app.post("/api/auth/signup",[ verifySignUp.checkDuplicateUsernameOrEmail],
        controller.signup );
   
    app.post("/api/auth/signin", 
        controller.signin);
    };
