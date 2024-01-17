const express = require('express')
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');
const {createCategory,updateCategory,deleteCategory, getAllCategories,getOneCategory} = require('../controller/categoryCtrl')
const router = express.Router();


router.post("/createcategory", authMiddleware,isAdmin,createCategory)
router.put("/updatecategory/:id", authMiddleware,isAdmin,updateCategory)
router.delete("/deletecategory/:id", authMiddleware,isAdmin,deleteCategory)
router.get("/getallcategories",getAllCategories )
router.get("/getonecategory/:id",getOneCategory )



module.exports = router
 
