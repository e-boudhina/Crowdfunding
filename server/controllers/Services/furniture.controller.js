const asyncHandler = require('express-async-handler')
const Furniture = require ('../../models/Services/furniture')

const getAllFurniture = asyncHandler(async (req, res) =>{
    Furniture.find({}, (error,result)=>{
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

const createFurniture = asyncHandler(async (req, res) =>{

    const {type} = req.body;

    if(!type){
        res.status(400)
        throw new Error('Please provide a furniture type field')
    }

    furniture =  await Furniture.create({
        type: type
    })
    if (furniture){
        res.status(200).json(
            {
                message:"Furniture added successfully", furniture}
        )
    }
        //else
        return res.status(500).send("There was an error while creating.");

});

const updateFurniture = asyncHandler(async (req, res) =>{

    const {furnitureId} = req.params;
    const {newType} = req.body;

    if(!furnitureId){
        res.status(400)
        throw new Error('Please provide a furniture id')
    }
    if(!newType){
        res.status(400)
        throw new Error('Please provide the new furniture type')
    }
    //return res.status(200).json(newType)
    //return res.status(200).json(req.body) - you can use this to update instead of writing type = new type you simply pass the entire body
    //using this short form throws cast objectID failed if the value does not comply with _id format
    const retrievedFurniture = await Furniture.findById(furnitureId);

    if (!retrievedFurniture){
        return res.status(200).json(
            {
                message: `There is no furniture registered under the id ${furnitureId}`
            }
        )
    }
    //else
    //the option "new : ?" returns the document as it was before update was applied when set to "false". If you set new: true, findOneAndUpdate() will instead give you the object after update was applied.
    updatedFurniture = await Furniture.findByIdAndUpdate(furnitureId, {type: newType},{new:true});
    if (!updateFurniture)
        return res.status(500).send("There was an error while updating");

    //else
        return res.status(200).json(
            {
                message:"Furniture updated successfully", updatedFurniture}
        )

});

const deleteFurniture = asyncHandler(async (req,res)=>{
    const {furnitureId} = req.params;

    if(!furnitureId) {
        res.status(400)
        throw new Error('Please provide a furniture id')
    }
    //continue
    const retrievedFurniture = await Furniture.findById(furnitureId);

    if (!retrievedFurniture){
        return res.status(200).json(
            {
                message: `There is no furniture registered under the id ${furnitureId}`
            }
        )
    }
    //else
    const deletedFurniture = await Furniture.findByIdAndDelete(furnitureId);
    return res.status(200).json({message :`Furniture Deleted Successfully`, deletedFurniture})
})

//Exporting like this is a must
module.exports = {getAllFurniture, createFurniture, updateFurniture, deleteFurniture}
