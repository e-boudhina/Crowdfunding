const db = require("../../models");
const User = db.user;
const asyncHandler = require('express-async-handler')

const checkAccount_Verification =  asyncHandler(async (req, res, next) => {

    User.findById(req.userId).exec((err, user) => {
        if (err) {
            return res.status(400).send({ message: err });
        }
        // console.log(user)
        //else
        if (!user.verified){
            return  res.status(200).send({
                message: "Please verify your account before accessing this route!",
                email: `The verification email for this account was sent to this email => ${user.email} <=`
            })
        }
        // next()

    })


})
module.exports = checkAccount_Verification
