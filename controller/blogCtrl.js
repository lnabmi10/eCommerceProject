const Blog = require('../models/blogModal')
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler');
const valideMongodbId = require('../utils/validateMongodbId')




const createBlog = asyncHandler(async(req,res)=>{

    try {

        const newBlog = await Blog.create(req.body)
        res.json({
            status : "success",
            newBlog ,
        })
        
    } catch (error) {
        throw new Error(error)
    }
})

const updateBlog = asyncHandler(async(req,res)=>{
    const {id}=req.params;


    try {

        const updatedBlog = await Blog.findByIdAndUpdate(id,req.body,{
            new : true
        })
        res.json(updatedBlog )
        
    } catch (error) {
        throw new Error(error)
    }
})


const getBlog = asyncHandler(async(req,res)=>{
    const {id}=req.params;


    try {

        const getBlog = await Blog.findById(id)

        await Blog.findByIdAndUpdate(id,
            {
                $inc : {numberOfViews : 1}
            },
            {new:true})
            res.json(getBlog )
        
    } catch (error) {
        throw new Error(error)
    }
})




const getAllBlogs = asyncHandler(async(req,res)=>{


    try {

        const getBlogs = await Blog.find()

       
         res.json(getBlogs )
        
    } catch (error) {
        throw new Error(error)
    }
})


const deleteBlog = asyncHandler(async(req,res)=>{
    const {id}=req.params;


    try {

        const deletedBlog = await Blog.findByIdAndDelete(id)
        res.json(deletedBlog )
        
    } catch (error) {
        throw new Error(error)
    }
})





module.exports={createBlog,updateBlog,getBlog,getAllBlogs,deleteBlog}