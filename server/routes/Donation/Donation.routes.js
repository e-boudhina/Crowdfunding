const { authJwt } = require("../../middlewares");
const controller = require("../../controllers/Donation/Donation.controller");
const db = require("../../models");
const Project = db.Project;
const organization = db.organization;
var path = require('path');






module.exports = function(app) {

        

//app.post("/api/project/donation/cash/:id/:idProject",controller.donateCash;
app.post("/api/project/donation/crypto/:id/:idProject",controller.donateCrypto);







//  app.get( "/api/test/inc",controller.IncubatorBoard );
// app.get("/api/test/admin", [authJwt.verifyToken, authJwt.isAdmin],  controller.adminBoard );
  };

