const express = require('express')
const router = express.Router()
const {getAllUserRequests, createUserRequest, approveUserRequest, rejectUserRequest} =  require('../../controllers/Services/userRequest.controller')
const { authJwt } = require("../../middlewares");


//Securing these routes will be done later
router.get('/', getAllUserRequests)
router.post('/', createUserRequest)
router.get('/approve/:userRequestId',approveUserRequest)
router.get('/reject/:userRequestId',rejectUserRequest)
//router.delete('/:furnitureId', deleteFurniture)

module.exports = router
