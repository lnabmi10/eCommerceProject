const Category = require('../models/categoryModel')
const asyncHandler = require('express-async-handler')
const valideMongodbId = require('../utils/validateMongodbId')

const createCategory = asyncHandler(async(req,res)=>{
    try {
        const newCategory = await Category.create(req.body)
        res.json(newCategory)

    } catch (error) {
        throw new Error(error)
    }})

const updateCategory = asyncHandler(async(req,res)=>{
    const {id}=req.params
    valideMongodbId(id)

        try {
            const updatedCategory = await Category.findByIdAndUpdate(id,req.body,{new:true})
            res.json(updatedCategory)
    
        } catch (error) {
            throw new Error(error)
        }})

const deleteCategory = asyncHandler(async(req,res)=>{
            const {id}=req.params
            valideMongodbId(id)

                try {
                    const deletedCategory = await Category.findByIdAndDelete(id)
                    res.json(deletedCategory)
            
                } catch (error) {
                    throw new Error(error)
                }})
const getAllCategories = asyncHandler(async(req,res)=>{
    try {
    const allCategories = await Category.find()
    res.json(allCategories)

        
    } catch (error) {
        throw new Error(error)
    }


}

)
const getOneCategory = asyncHandler(async(req,res)=>{
    const {id} = req.params
    valideMongodbId(id)

    try {
    const theCategory = await Category.findById(id)
    res.json(theCategory)

        
    } catch (error) {
        throw new Error(error)
    }}

)

module.exports = {createCategory,updateCategory,deleteCategory,getAllCategories,getOneCategory}