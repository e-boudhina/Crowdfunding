const db = require("../../models");
const User = db.user;
const asyncHandler = require('express-async-handler')

const verify_Admin =  asyncHandler(async (req, res, next) => {

    const {userId} = req.body

    if(!userId){
        res.status(400)
        throw new Error('Please provide a valid userId')
    }
   // console.log(req.body.userId)
    //return res.send(req)
    //if you pass the wrong id a cast error is shown
    user = await User.findById(req.body.userId).exec();
    //you need to get the roles value
    console.log(user.roles[0].toString())
        if (!user) {
            return res.status(400).send({ message: "there is no user under that id" });
        }
         console.log("second step")



            // return  res.status(200).send({
            //     message: "Found"
            // })

         next()




})
module.exports = verify_Admin
