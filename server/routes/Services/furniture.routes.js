const express = require('express')
const router = express.Router()
const {getAllFurniture, createFurniture, updateFurniture, deleteFurniture} = require('../../controllers/Services/furniture.controller')
const { authJwt } = require("../../middlewares");

//Securing these routes will be done later
router.get('/', getAllFurniture)
router.post('/', createFurniture)
router.put('/:furnitureId',updateFurniture)
router.delete('/:furnitureId', deleteFurniture)


//You must always export router or else module.exports = router or else TypeError: Router.use() requires middleware function but got a Object will be thrown
module.exports = router
