const Blog = require('../models/blogModal')
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler');
const valideMongodbId = require('../utils/validateMongodbId')



const createBlog = asyncHandler(async(req,res)=>{

    try {

        const newBlog = await Blog.create(req.body)
        res.json({
            status : succes,
            newBlog ,
        })
        
    } catch (error) {
        throw new Error(error)
    }
})



module.exports={createBlog}