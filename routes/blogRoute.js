const express = require('express');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');
const {createBlog,updateBlog,getBlog,getAllBlogs,deleteBlog,likeBlog,dislikeBlog, uploadBlogImages}=require('../controller/blogCtrl');
const { blogsImgResize, uploadImg } = require('../middlewares/uplodingImages');
const router = express.Router();



router.post("/createblog", authMiddleware,isAdmin,createBlog)
router.put("/updateblog/:id", authMiddleware,isAdmin,updateBlog)
router.put("/upload/:id",authMiddleware,uploadImg.array('images',10),blogsImgResize,uploadBlogImages)

router.delete("/deleteblog/:id", authMiddleware,isAdmin,deleteBlog)
router.get("/getblog/:id",getBlog)
router.get("/getallblogs/",getAllBlogs)
router.put("/likeblog",authMiddleware,likeBlog)
router.put("/dislikeblog",authMiddleware,dislikeBlog)




module.exports=router