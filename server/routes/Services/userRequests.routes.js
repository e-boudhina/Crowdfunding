const express = require('express')
const router = express.Router()
const {getAllUserRequests, createUserRequest, approveUserRequest, rejectUserRequest, getUserRequestsByUserId, getIncubatorRequestsByIncubatorId} =  require('../../controllers/Services/userRequest.controller')
const { authJwt, verifyUserRequestValidity } = require("../../middlewares");


//Securing these routes will be done later
router.get('/', [authJwt.verifyToken], getAllUserRequests)
router.post('/', [authJwt.verifyToken, verifyUserRequestValidity],createUserRequest)
router.get('/approve/:userRequestId',[authJwt.verifyToken, authJwt.isIncubator],approveUserRequest)
router.get('/reject/:userRequestId',[authJwt.verifyToken, authJwt.isIncubator],rejectUserRequest)
router.get('/user', [authJwt.verifyToken], getUserRequestsByUserId)
router.get('/incubator', [authJwt.verifyToken, authJwt.isIncubator], getIncubatorRequestsByIncubatorId)
// you can later add advanced search and delete method for the admin to manage but its optional for now

module.exports = router
