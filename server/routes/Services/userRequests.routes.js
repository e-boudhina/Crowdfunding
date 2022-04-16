const express = require('express')
const router = express.Router()
const {getAllUserRequests, createUserRequest, approveUserRequest, rejectUserRequest, getUserRequestsByUserId, getIncubatorRequestsByIncubatorId} =  require('../../controllers/Services/userRequest.controller')
const { authJwt } = require("../../middlewares");


//Securing these routes will be done later
router.get('/', getAllUserRequests)
router.post('/', createUserRequest)
router.get('/approve/:userRequestId',approveUserRequest)
router.get('/reject/:userRequestId',rejectUserRequest)
router.get('/user', getUserRequestsByUserId)
router.get('/incubator', getIncubatorRequestsByIncubatorId)
// you can later add advanced search and delete method for the admin to manage but its optional for now

module.exports = router
