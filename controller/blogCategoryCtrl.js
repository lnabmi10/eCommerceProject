const BlogCategory = require('../models/blogCategoryModel')
const asyncHandler = require('express-async-handler')
const valideMongodbId = require('../utils/validateMongodbId')

const createBlogCategory = asyncHandler(async(req,res)=>{
    try {
        const newBlogCategory = await BlogCategory.create(req.body)
        res.json(newBlogCategory)

    } catch (error) {
        throw new Error(error)
    }})

const updateBlogCategory = asyncHandler(async(req,res)=>{
    const {id}=req.params
    valideMongodbId(id)

        try {
            const updatedBlogCategory = await BlogCategory.findByIdAndUpdate(id,req.body,{new:true})
            res.json(updatedBlogCategory)
    
        } catch (error) {
            throw new Error(error)
        }})

const deleteBlogCategory = asyncHandler(async(req,res)=>{
            const {id}=req.params
            valideMongodbId(id)

                try {
                    const deletedBlogCategory = await BlogCategory.findByIdAndDelete(id)
                    res.json(deletedBlogCategory)
            
                } catch (error) {
                    throw new Error(error)
                }})
const getAllBlogCategories = asyncHandler(async(req,res)=>{
    try {
    const allBlogCategories = await BlogCategory.find()
    res.json(allBlogCategories)

        
    } catch (error) {
        throw new Error(error)
    }


}

)
const getOneBlogCategory = asyncHandler(async(req,res)=>{
    const {id} = req.params
    valideMongodbId(id)

    try {
    const theBlogCategory = await BlogCategory.findById(id)
    res.json(theBlogCategory)

        
    } catch (error) {
        throw new Error(error)
    }}

)

module.exports = {createBlogCategory,updateBlogCategory,deleteBlogCategory,getAllBlogCategories,getOneBlogCategory}