const Blog = require('../models/blogModal')
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler');
const valideMongodbId = require('../utils/validateMongodbId')
const coudinaryUploadImg = require('../utils/cloudinary')
const fs = require('fs')



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

        const getBlog = await Blog.findById(id).populate("likes").populate("dislikes")

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
    valideMongodbId(id);
    
    try {

        const deletedBlog = await Blog.findByIdAndDelete(id)
        res.json(deletedBlog )
        
    } catch (error) {
        throw new Error(error)
    }
})

const likeBlog = asyncHandler(async(req,res)=>{
    const {blogId}=req.body;
    valideMongodbId(blogId);
    // find the blog

    const blog = await Blog.findById(blogId)
    // find the user login
    
    const loginUserId = req?.user?._id

    // check if the user alredy like the post 659eec58b1f91e7d5eb72127

    const isLiked = blog?.isLiked
    console.log(isLiked)

    // check if the user alredy dislike the post
    const alreadyDislike = blog?.dislikes?.find((userId)=>userId.toString()===loginUserId.toString() )
    if(alreadyDislike){
        const blogRemoveDislike = await Blog.findByIdAndUpdate(
            blogId,{
                $pull : {dislikes : loginUserId},
                isDisliked : false
            },{
                new:true
            }
        )
        res.json(blogRemoveDislike)
    }
    if(isLiked){
        
        const blogRemoveLike = await Blog.findByIdAndUpdate(
            blogId,{
                $pull : {likes : loginUserId},
                isLiked : false
            },{
                new:true
            }
        )
        res.json(blogRemoveLike)

    }else{
        const blogLiked = await Blog.findByIdAndUpdate(
            blogId,{
                $push : {likes : loginUserId},
                isLiked : true
            },{
                new:true
            }
        )
        res.json(blogLiked)

    }


}

)
const dislikeBlog = asyncHandler(async(req,res)=>{
    const {blogId}=req.body;
    valideMongodbId(blogId);
    // find the blog

    const blog = await Blog.findById(blogId)
    // find the user login
    
    const loginUserId = req?.user?._id

    // check if the user alredy like the post 659eec58b1f91e7d5eb72127

    const isDisliked = blog?.isDisliked

    // check if the user alredy dislike the post
    const alreadyLike = blog?.likes?.find((userId)=>userId.toString()===loginUserId.toString() )
    if(alreadyLike){
        const blogRemovelike = await Blog.findByIdAndUpdate(
            blogId,{
                $pull : {likes : loginUserId},
                isLiked : false
            },{
                new:true
            }
        )
        res.json(blogRemovelike)
    }
    if(isDisliked){
        
        const blogRemoveDislike = await Blog.findByIdAndUpdate(
            blogId,{
                $pull : {dislikes : loginUserId},
                isDisliked : false
            },{
                new:true
            }
        )
        res.json(blogRemoveDislike)

    }else{
        const blogDisLiked = await Blog.findByIdAndUpdate(
            blogId,{
                $push : {dislikes : loginUserId},
                isDisliked : true
            },{
                new:true
            }
        )
        res.json(blogDisLiked)

    }})

    const uploadBlogImages = asyncHandler(async (req,res)=>{
        const {id} = req.params
        valideMongodbId(id)
        try {
            const  uploader =  (path) => {
              return  coudinaryUploadImg(path,"images")  
            }
            const urls =[]
            const files=req.files
            for (const file of files){
                const {path}=file
                
                const newPath = await uploader(path)   ; 
                urls.push(newPath);
              //  fs.unlinkSync(path)


            }
            const updateBlog = await Blog.findByIdAndUpdate(id,
                {
                images : urls.map( (file)=>{
                    return file;
                })
            },{new:true})

            res.json(updateBlog)


        } catch (error) {
            throw new Error(error)
            
        }

    })



module.exports={createBlog,updateBlog,getBlog,getAllBlogs,deleteBlog,likeBlog,dislikeBlog,uploadBlogImages}