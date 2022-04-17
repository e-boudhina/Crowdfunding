const asyncHandler = require('express-async-handler')
const userRequest = require ('../../models/Services/userRequest')
const Furniture = require("../../models/Services/furniture");

const getAllUserRequests = asyncHandler(async (req, res) =>{
    userRequest.find({}, (error, result)=>{
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
// you can use jwt is Incubator middleware and check if the user is incubator or normal user and based on that you either search by user id or incubatorId - Combine 2 method into one
const getUserRequestsByUserId = asyncHandler(async (req, res) =>{
    const {userid} = req.headers
    if(!userid ){
        res.status(400)
        throw new Error('Please provide a valid userId')
    }

    userRequest.find({userId: userid}, (error, result)=>{
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

const getIncubatorRequestsByIncubatorId = asyncHandler(async (req, res) =>{

    const {incubatorid} = req.headers
    if(!incubatorid ){
        res.status(400)
        throw new Error('Please provide a valid userId')
    }

    userRequest.find({incubatorId: incubatorid}, (error, result)=>{
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

    // you can add a middleware to check something in headers or it could be done here

    /*
    Note that headers can not be sent in uppercase in the "headers segment" so is you send userId => it will be converted automatic to lower case "userid"
    I had troubles with this trying to find where the problem was. That being said the "parameters" can be upper or lower case. DO not confuse the two of them
    */
    //Extracting user id
    const {userid} = req.headers
    //extracting body fields
    const {desired_Location, preferred_Starting_Date, expected_Ending_Date, number_Of_Employees, furniture } = req.body;
   // return  res.status(200).json("here"+type)
   //  return  res.status(200).json({
   //      message : req.body
   //  })

    if(!userid || !desired_Location || !preferred_Starting_Date || !expected_Ending_Date || !number_Of_Employees|| !furniture){
         res.status(400)
         throw new Error('Please provide all fields')
     }
    // console.log('passing')
    const userRequestToBeCreated =  await userRequest.create({
         //user id will be sent in headers
        //the form is on its own
        userId: userid,
        desired_Location: desired_Location,
        preferred_Starting_Date: preferred_Starting_Date,
        expected_Ending_Date: expected_Ending_Date,
        number_Of_Employees: number_Of_Employees,
        furniture: furniture
    })
    //console.log(userRequestToBeCreated)

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
    //Fetching user request id params
    const {userRequestId} = req.params;
    //Fetching incubator id
    const {incubatorid} = req.headers

    if(!incubatorid ){
        res.status(400)
        throw new Error('Please provide a valid incubatorId')
    }
    if(!userRequestId ){
        res.status(400)
        throw new Error('Please provide a valid userRequestId')
    }

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
    approvedUserRequest= await userRequest.findByIdAndUpdate(userRequestId, {incubatorId: incubatorid, status: true},{new:true});
    if (!approvedUserRequest)
        return res.status(500).send("There was an error while updating");

    //else
    return res.status(200).json(
        {
            message:"UserRequest has been approved!", approvedUserRequest}
       )

});

const rejectUserRequest = asyncHandler(async (req, res) =>{
    //Fetching user request id params
    const {userRequestId} = req.params;
    //Fetching incubator id
    const {incubatorid} = req.headers

    if(!incubatorid ){
        res.status(400)
        throw new Error('Please provide a valid incubatorId')
    }
    if(!userRequestId ){
        res.status(400)
        throw new Error('Please provide a valid userRequestId')
    }

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
    rejectedUserRequest= await userRequest.findByIdAndUpdate(userRequestId, {incubatorId: incubatorid, status: false},{new:true});
    if (!rejectedUserRequest)
        return res.status(500).send("There was an error while updating");

    //else
    return res.status(200).json(
        {
            message:"UserRequest has been rejected!", rejectedUserRequest}
    )

});

module.exports =  {
    getAllUserRequests,
    createUserRequest,
    approveUserRequest,
    rejectUserRequest,
    getUserRequestsByUserId,
    getIncubatorRequestsByIncubatorId
}
