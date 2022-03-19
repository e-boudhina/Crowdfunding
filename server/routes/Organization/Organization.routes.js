const { authJwt } = require("../../middlewares");
const controller = require("../../controllers/Organization/Organization.controller");
const db = require("../../models");
const organization = db.organization;


module.exports = function(app) {
app.post("/api/organization/add",controller.addOrganization);
app.get("/api/organization/all",controller.all);
app.get("/api/organization/:id",controller.getOrgByid);
app.post("/api/organization/follow/:id/:idUser",controller.followOrganization);
app.post("/api/organization/addProjectToOrganization/:idOrganization/:idProject",controller.addProjectToOrganization);
app.post("/api/organization/unfollow/:id/:idUser",controller.unfollowOrganization);
app.delete("/api/organization/delete/:id",controller.deleteOrganization);
// app.put("/api/organization/update",controller.getOrganizationByUser);
};