const { verifySignUp, authJwt} = require("../../middlewares");
const controller = require("../../controllers/User/auth.controller");
const controller2 = require("../../controllers/User/user.controller");
var path = require('path');

module.exports = function(app) {
  var multer = require('multer');
  
  var storage = multer.diskStorage({
      destination: (req, file, cb) => {
          console.log("FIELDNAME "+file.fieldname);
          cb(null,path.join(__dirname, '../../../client/public/profile-uploads'))
      },
      filename: (req, file, cb) => {
          console.log("ORIGINAL NAME "+file.originalname);
          cb(null, file.originalname )
  
      }
  
  }
  );
  var upload = multer({ storage: storage });
    //This is a middleware it should be moved to a middleware directory
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
   // app.post("/api/auth/signup",upload.single('image'), controller.signup );
    app.post("/api/auth/signup",[ verifySignUp.checkDuplicateUsernameOrEmail,upload.single('image')], controller.signup );
    app.post("/api/auth/signin", controller.signin);
    app.post("/api/auth/verify-email/:verify_email_token", controller.verify_email);
    app.post("/api/auth/reset-password", controller.reset_password);
    app.post("/api/auth/new-password", controller.new_password);
    app.get("/api/auth/verify-email", [authJwt.verifyToken], controller.resend_EmailToken);
    app.post("/api/user/update", upload.single('image') ,controller2.updateUserProfile);



    };


