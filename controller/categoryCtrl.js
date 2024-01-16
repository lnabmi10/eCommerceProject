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


module.exports = {createCategory}