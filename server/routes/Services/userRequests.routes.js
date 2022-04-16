const express = require('express')
const router = express.Router()
const {getAllUserRequests, createUserRequest, approveUserRequest} =  require('../../controllers/Services/userRequest.controller')

//Securing these routes will be done later
router.get('/', getAllUserRequests)
router.post('/', createUserRequest)
router.get('/approve/:userRequestId',approveUserRequest)
// router.get('/reject/:userRequestId',approveUserRequest)
//router.delete('/:furnitureId', deleteFurniture)

module.exports = router
