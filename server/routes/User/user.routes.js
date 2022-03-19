const { authJwt } = require("../../middlewares");
const controller = require("../../controllers/User/user.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });

    app.get("/api/test/all", controller.allAccess);
    app.get("/api/user/refreshuser/", controller.getUser);
    app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);
    app.get( "/api/test/inc", [authJwt.verifyToken,authJwt.isIncubator],controller.IncubatorBoard );
    app.get("/api/test/admin", [authJwt.verifyToken, authJwt.isAdmin],  controller.adminBoard );

  };