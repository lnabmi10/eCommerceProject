const express = require('express')
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');
const {createBlogCategory,updateBlogCategory,deleteBlogCategory, getAllBlogCategories,getOneBlogCategory} = require('../controller/blogCategoryCtrl')
const router = express.Router();


router.post("/createblogcategory", authMiddleware,isAdmin,createBlogCategory)
router.put("/updateblogcategory/:id", authMiddleware,isAdmin,updateBlogCategory)
router.delete("/deleteblogcategory/:id", authMiddleware,isAdmin,deleteBlogCategory)
router.get("/getallblogcategories",getAllBlogCategories )
router.get("/getoneBlogcategory/:id",getOneBlogCategory )



module.exports = router
 