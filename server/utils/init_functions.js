const Role = require('../models/User/role.model')

exports.initRoles = () => {
    Role.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new Role({
          name: "user"
        }).save(err => {
          if (err) {
            console.log("error ", err);
          }
          console.log(" added user role successfully");
        });
        new Role({
          name: "admin"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
          console.log("added admin role successfully");
        });
        new Role({
          name: "incubator"
        }).save(err => {
          if (err) {
            console.log("error ", err);
          }
          console.log(" incubator role added successfuly");
        });
      }
    });
  }