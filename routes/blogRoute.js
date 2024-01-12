const express = require('express');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');
const {createBlog,updateBlog,getBlog,getAllBlogs,deleteBlog}=require('../controller/blogCtrl');
const router = express.Router();



router.post("/createblog", authMiddleware,isAdmin,createBlog)
router.put("/updateblog/:id", authMiddleware,isAdmin,updateBlog)
router.delete("/deleteblog/:id", authMiddleware,isAdmin,deleteBlog)
router.get("/getblog/:id",getBlog)
router.get("/getallblogs/",getAllBlogs)




module.exports=router