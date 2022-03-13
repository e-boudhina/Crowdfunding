const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
 
const db = {};
db.mongoose = mongoose;
db.ROLES = ["user" , "admin" , "incubator"];
db.user = require("./User/user.model")
db.Image = require("./Image/image.model")
db.Project=require("./Event/Event.model")
db.Project=require("./Project/project.model")
db.organization=require("./Organization/organization.model")
db.role = require("./User/role.model")
db.incubator = require("./User/incubator.model")
db.admin = require("./User/admin.model")

module.exports = db;