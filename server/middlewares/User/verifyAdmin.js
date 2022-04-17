const db = require("../../models");
const User = db.user;
let Role = db.role;
const asyncHandler = require('express-async-handler')

const verify_Admin =  asyncHandler(async (req, res, next) => {

    return res.status(200).send({usertoken: req.headers})
    // you need to change this use the token

    const {userId} = req.body

    if(!userId){
        res.status(400)
        throw new Error('Please provide a valid userId')
    }
   // console.log(req.body.userId)
    //return res.send(req)
    //if you pass the wrong id a cast error is shown
    user = await User.findById(req.body.userId).exec();

    if (!user) {
        return res.status(400).send({
            message: `There is no user under the id \'${userId}\'`
        });

    }
    //you need to get the roles value
    //console.log(user.roles[0].valueOf())
    //Using this will not allow you to get into the role sub fields
    //Role = await Role.find({name:'admin'},{name: 1});
    //Use this isntead
    var isAdmin = false
    adminRole = await Role.findOne({name:'admin'},{name: 1});
    //console.log("before"+adminRole)
    //make sure you awlays use findOne since find will always return an object even if the result is one
    // return res.status(200).send(adminRole._id)
    //console.log("after")

        for (role of user.roles){
          //  console.log("Admin id "+adminRole._id)
           // console.log("user current role "+role._id)
            //You can also use if roles includes admin value
            //console.log(user.roles.includes(User.getRoleName(admin)))
            if (role._id.toString() === adminRole._id.toString()){
             //   console.log("inside")
                 isAdmin = true
                //console.log("isAdmin"+isAdmin)
            }
            // role.getRoleName(role._id.toString())})
            //console.log(Role.getRoleName(role._id.toString()))
            // console.log(role._id.toString())
        }
    //return res.status(200).send(isAdmin)

    if (!isAdmin) {
        return res.status(400).send({
            message: `User \'${user.username}\' registered under the id \'${userId}\' is not autorized to perform this action - This Route Requires Admin privileges`
        })
    }

    //Proceed to next request
        next()

})
module.exports = verify_Admin
