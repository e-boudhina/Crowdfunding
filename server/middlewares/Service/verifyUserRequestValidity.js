const db = require("../../models");
const User = db.user;
let Role = db.role;
const asyncHandler = require('express-async-handler')
const userRequest = require ('../../models/Services/userRequest')

const verify_UserRequestValidity =  asyncHandler(async (req, res, next) => {
    // we are setting this as an argument that does not belong to the body, headers or params which a new thing that I learned you can set anything into the request in a middleware
    // let userid = req.headers["userid"];
    let userid = req.userId;
    if (!userid) {
        return res.status(403).send({ message: "Please make sure that you include a valid userid in you request !" });
    }
    //then check if the user has submitted previous requests that are still pending ( status != true/false => undefined)
    userRequests = await userRequest.find({userId: userid});
    //return res.status(403).send({ message: userRequests });

    //if not empty
    if(userRequests) {
            for(uR of userRequests){
                //You can not submit a new request unless an your previous request is either Approved or rejected by an Incubator
                //console.log(uR.status)
                if (uR.status === undefined)
                {
                    return res.status(200).send({ message: "Your previous request is still pending!" });
                }
            }

    }
    //else proceed without checking
    next()

})
module.exports = verify_UserRequestValidity
