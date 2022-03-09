const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
 
const db = {};
db.mongoose = mongoose;
db.ROLES = ["user" , "admin" , "incubator"];
db.user = require("./User/user.model")
db.role = require("./User/role.model")
db.incubator = require("./User/incubator.model")
db.admin = require("./User/admin.model")

module.exports = db;