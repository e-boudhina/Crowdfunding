const { authJwt } = require("../../middlewares");
const controller = require("../../controllers/User/user.controller");
const verifiedAccount_Middleware = require("../../middlewares/User/verifiedAccount_Middleware");
const verify_Admin = require("../../middlewares/User/verifyAdmin");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });

    app.get("/api/test/all", controller.allAccess);
    app.get("/api/test/user", [authJwt.verifyToken, verifiedAccount_Middleware], controller.userBoard);
    app.get( "/api/test/inc", [authJwt.verifyToken, authJwt.isIncubator],controller.IncubatorBoard );
    app.get("/api/test/admin", [authJwt.verifyToken, authJwt.isAdmin],  controller.adminBoard );

    app.post("/api/user/update", controller.updateUserProfile);
    app.delete("/api/user/:userId", controller.deleteUser);
    app.get("/api/user/searchusers/:keyword",controller.searchUsers);
    //Getting all users
    app.get("/api/user",controller.getUsers);

    app.get("/api/user/:username",controller.FindSingleProfile);
    //Become admin
    app.post("/api/user/makeAdmin/:id", controller.makeAdmin);

    //Admin can not become incubator? - Verify admin middleware missing admin role verification
    app.post("/api/user/makeIncubator/:id", controller.makeIncubator);

    //Banning user
    app.post("/api/user/ban/:username", controller.banUser);
    app.post("/api/user/unban/:username", controller.unbanUser);

  };
