const Brand = require('../models/brandModel')
const asyncHandler = require('express-async-handler')
const valideMongodbId = require('../utils/validateMongodbId')

const createBrand = asyncHandler(async(req,res)=>{
    try {
        const newBrand = await Brand.create(req.body)
        res.json(newBrand)

    } catch (error) {
        throw new Error(error)
    }})

const updateBrand = asyncHandler(async(req,res)=>{
    const {id}=req.params
    valideMongodbId(id)

        try {
            const updatedBrand = await Brand.findByIdAndUpdate(id,req.body,{new:true})
            res.json(updatedBrand)
    
        } catch (error) {
            throw new Error(error)
        }})

const deleteBrand = asyncHandler(async(req,res)=>{
            const {id}=req.params
            valideMongodbId(id)

                try {
                    const deletedBrand = await Brand.findByIdAndDelete(id)
                    res.json(deletedBrand)
            
                } catch (error) {
                    throw new Error(error)
                }})
const getAllBrands = asyncHandler(async(req,res)=>{
    try {
    const allBrands = await Brand.find()
    res.json(allBrands)

        
    } catch (error) {
        throw new Error(error)
    }


}

)
const getOneBrand = asyncHandler(async(req,res)=>{
    const {id} = req.params
    valideMongodbId(id)

    try {
    const theBrand = await Brand.findById(id)
    res.json(theBrand)

        
    } catch (error) {
        throw new Error(error)
    }}

)

module.exports = {createBrand,updateBrand,deleteBrand,getAllBrands,getOneBrand}