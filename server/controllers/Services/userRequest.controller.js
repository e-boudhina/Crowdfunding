const asyncHandler = require('express-async-handler')
const userRequest = require ('../../models/Services/userRequest')
const Furniture = require("../../models/Services/furniture");

const getAllUserRequests = asyncHandler(async (req, res) =>{
    userRequest.find({}, (error,result)=>{
        if (error) {
            return res.status(500).send(
                {
                    message: err
                }
            );
        }
        //else
        return res.status(200).send(result);
    })

});

const createUserRequest = asyncHandler(async (req, res) =>{

    //const {type} = req.body;
   // return  res.status(200).json("here"+type)
   //  return  res.status(200).json({
   //      message : req.headers
   //  })

    // if(!type){
    //     res.status(400)
    //     throw new Error('Please provide a furniture type field')
    // }

    const userRequestToBeCreated =  await userRequest.create({
         //user id will be sent in headers
        //the form is on its own
        userId: req.headers.userid,
        desired_Location: req.body.desired_Location,
        furniture: req.body.furniture
    })
    console.log(userRequestToBeCreated)


    if (userRequestToBeCreated){
        return  res.status(200).json(
            {
                message:"User Request created successfully", userRequestToBeCreated}
        )
    }
    //else
    return res.status(500).send("There was an error while creating.");

});

const approveUserRequest = asyncHandler(async (req, res) =>{
    const {userRequestId} = req.params;

    const retrievedUserRequest = await userRequest.findById(userRequestId);

    if (!retrievedUserRequest){
        return res.status(200).json(
            {
                message: `There is no userRequest registered under the id ${userRequestId}`
            }
        )
    }
    //console.log(retrievedUserRequest.status ===true)
    //else check if userRequest is already approved
    if (retrievedUserRequest.status){
        return res.status(200).json(
            {
                message: `Request ${userRequestId} has already been approved! `
            }
        )
    }

    //else proceed with approval
    //the option "new : ?" returns the document as it was before update was applied when set to "false". If you set new: true, findOneAndUpdate() will instead give you the object after update was applied.
    approvedUserRequest= await userRequest.findByIdAndUpdate(userRequestId, {status: true},{new:true});
    if (!approvedUserRequest)
        return res.status(500).send("There was an error while updating");

    //else
    return res.status(200).json(
        {
            message:"UserRequest has been approved!", approvedUserRequest}
       )

});

const rejectUserRequest = asyncHandler(async (req, res) =>{
    const {userRequestId} = req.params;

    const retrievedUserRequest = await userRequest.findById(userRequestId);

    if (!retrievedUserRequest){
        return res.status(200).json(
            {
                message: `There is no userRequest registered under the id ${userRequestId}`
            }
        )
    }

    //else check if userRequest is already approved
    if (!retrievedUserRequest.status){
        return res.status(200).json(
            {
                message: `Request ${userRequestId} has already been rejected! `
            }
        )
    }

    //else proceed with approval
    //the option "new : ?" returns the document as it was before update was applied when set to "false". If you set new: true, findOneAndUpdate() will instead give you the object after update was applied.
    rejectedUserRequest= await userRequest.findByIdAndUpdate(userRequestId, {status: false},{new:true});
    if (!rejectedUserRequest)
        return res.status(500).send("There was an error while updating");

    //else
    return res.status(200).json(
        {
            message:"UserRequest has been rejected!", rejectedUserRequest}
    )

});

module.exports =  {getAllUserRequests, createUserRequest, approveUserRequest,rejectUserRequest}
