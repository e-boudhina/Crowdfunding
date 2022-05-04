const asyncHandler = require('express-async-handler')
const userRequest = require ('../../models/Services/userRequest')
const User = require ('../../models/User/user.model')
const Furniture = require("../../models/Services/furniture");
const transport = require("../../config/nodemailer");
const userRequestStatusNotificationEmailTemplate =require('../../Templates/Emails/userRequestStatusNotificationEmail')
const VerificationEmailTemplateTemplate = require("../../Templates/Emails/VerificationEmail");
const getAllUserRequests = asyncHandler(async (req, res) =>{
    userRequests = await userRequest.find({status: undefined}).populate("userId").populate("incubatorId").populate({path:'furniture', populate: { path: "_id", model: 'Furniture'}} );

    // userRequest.find({}, (error, result)=>{
    //     if (error) {
    //         return res.status(500).send(
    //             {
    //                 message: err
    //             }
    //         );
    //     }
        //else
        return res.status(200).send(userRequests);
    // })

});
// you can use jwt is Incubator middleware and check if the user is incubator or normal user and based on that you either search by user id or incubatorId - Combine 2 method into one
const getUserRequestsByUserId = asyncHandler(async (req, res) =>{
    const {userId} = req
    if(!userId ){
        res.status(400)
        throw new Error('Please provide a valid userId')
    }
//populate("roles", "-__v")
// .populate("userId", {username:1}
//     populate({path: "furniture._id"}).exec();
    userRequests = await userRequest.find({userId: userId}).populate("userId").populate("incubatorId").populate({path:'furniture', populate: { path: "_id", model: 'Furniture'}} );
    // return res.status(200).send({
    //     objects: userRequests
    // })
    // userRequest.find({userId: userid}, (error, result)=>{
    //     if (error) {
    //         return res.status(500).send(
    //             {
    //                 message: err
    //             }
    //         );
    //     }
        //else

        return res.status(200).send(userRequests);
    // })

});

const getIncubatorRequestsByIncubatorId = asyncHandler(async (req, res) =>{
    // return  res.status(200).json({
    //     message : req.userId
    //  })
    const incubatorid = req.userId
    if(!incubatorid ){
        res.status(400)
        throw new Error('Please provide a valid userId')
    }

    userRequests = await userRequest.find({incubatorId: incubatorid}).populate("userId").populate("incubatorId").populate({path:'furniture', populate: { path: "_id", model: 'Furniture'}} );

    // userRequest.find({incubatorId: incubatorid}, (error, result)=>{
    //     if (error) {
    //         return res.status(500).send(
    //             {
    //                 message: err
    //             }
    //         );
    //     }
        //else
        return res.status(200).send(userRequests);
    // })

});
const createUserRequest = asyncHandler(async (req, res) =>{

    // you can add a middleware to check something in headers or it could be done here

    /*
    Note that headers can not be sent in uppercase in the "headers segment" so is you send userId => it will be converted automatic to lower case "userid"
    I had troubles with this trying to find where the problem was. That being said the "parameters" can be upper or lower case. DO not confuse the two of them
    */
    //Extracting user id
    const userid = req.userId
    //extracting body fields
    const {desired_Location, preferred_Starting_Date, expected_Ending_Date, number_Of_Employees, furniture, furnished_Requirement } = req.body;
    // return  res.status(200).json("here"+type)
    //  return  res.status(200).json({
    //     list:  furniture?.length,
    //    //requirement : furnished_Requirement ===undefined,
    //      sent: (!furniture && furnished_Requirement) || (furniture && !furnished_Requirement)
    //  })

    // if(!furnished_Requirement){
    //     if(furnished_Requirement===true){
    //
    //     }else if(furnished_Requirement ===false){
    //
    //     }
    //     res.status(400)
    //     throw new Error('Please provide primary fields')
    // }
    //Only one of these should exist but not both XOR logical comparison
    //console.log(req.body)
    if(!(( furnished_Requirement === true || furnished_Requirement ===false && furniture=== undefined) || (furniture !== undefined &&  furnished_Requirement === undefined)))
    {
        res.status(400)
        //throw new Error('Please provide primary critical fields - Select the type of office your like')
         throw new Error('Please provide primary fields - Either furniture or furnished_Requirement is required but NOT both')
    }
    //preventing empty furniture from proceeding
    if(furniture !== undefined)
    {
        if(furniture.length ===0)
        {
            res.status(400)
             throw new Error('Please select at least one furniture with a minimum quantity of 1')
        }
    }
    if(!userid || !desired_Location || !preferred_Starting_Date || !expected_Ending_Date || !number_Of_Employees){
        res.status(400)
        throw new Error('Please provide secondary fields')
    }
    var userRequestToBeCreated;
    //This method can be optimised to shorten the code
    if(!furnished_Requirement)
    {
        userRequestToBeCreated =  await userRequest.create({
            //user id will be sent in headers
            //the form is on its own
            userId: userid,
            desired_Location: desired_Location,
            preferred_Starting_Date: preferred_Starting_Date,
            expected_Ending_Date: expected_Ending_Date,
            number_Of_Employees: number_Of_Employees,
            furniture: furniture
        })

    }else {
        //even though you did not specify the array of furniture it will get returned in the result by default
        userRequestToBeCreated =  await userRequest.create({
            //user id will be sent in headers
            //the form is on its own
            userId: userid,
            desired_Location: desired_Location,
            preferred_Starting_Date: preferred_Starting_Date,
            expected_Ending_Date: expected_Ending_Date,
            number_Of_Employees: number_Of_Employees,
            furnished_Requirement: furnished_Requirement
        })
    }

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
    const incubatorid = req.userId

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

    const approvedUserId = approvedUserRequest.userId;
    const approvedIncubatorId = approvedUserRequest.incubatorId;
    fetchedUser = await User.findById(approvedUserId)
    fetchedIncubator = await User.findById(approvedIncubatorId)

    //else
    // console.log("Sending Approved Email...")
    //
    // console.log("user info", fetchedUser)
    // console.log("incubator info", fetchedIncubator)
    // return res.status(200).json(
    //     {
    //         request: approvedUserRequest,
    //         fetchedUser: fetchedUser,
    //         fetchedIncubator : fetchedIncubator
    //     }
    // )

    await transport.sendMail(userRequestStatusNotificationEmailTemplate(fetchedUser,fetchedIncubator,approvedUserRequest))
        .then(() => console.log('Notification email Sent Successfully!'))
        .catch(error => {
            console.log(error)
        });
    return res.status(200).json(
        {
            message:"UserRequest has been approved! User has just been notified", approvedUserRequest}
    )

});

const rejectUserRequest = asyncHandler(async (req, res) =>{

    // return res.status(200).json(
    //     {
    //         message: req.headers
    //     }
    // )
    //Fetching user request id params
    const {userRequestId} = req.params;
    //Fetching incubator id
    const incubatorid = req.userId

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

    //else check if userRequest is already rejected
    // return res.status(200).json(
    //     {
    //         message: retrievedUserRequest.status !==undefined
    //     }
    // )
    //You mush use this syntax since it can be undefined. As such you can not  use "!="
    if (retrievedUserRequest.status ===false){
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

    const rejectedUserId = rejectedUserRequest.userId;
    const rejectedIncubatorId = rejectedUserRequest.incubatorId;
    fetchedUser = await User.findById(rejectedUserId)
    fetchedIncubator = await User.findById(rejectedIncubatorId)
    await transport.sendMail(userRequestStatusNotificationEmailTemplate(fetchedUser,fetchedIncubator,rejectedUserRequest))
        .then(() => console.log('Notification email Sent Successfully!'))
        .catch(error => {
            console.log(error)
        });
    return res.status(200).json(
        {
            message:"UserRequest has been rejected! User has just been notified", rejectedUserRequest}
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
