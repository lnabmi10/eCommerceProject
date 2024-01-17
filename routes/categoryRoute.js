const express = require('express')
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');
const {createCategory,updateCategory,deleteCategory} = require('../controller/categoryCtrl')
const router = express.Router();


router.post("/createcategory", authMiddleware,isAdmin,createCategory)
router.put("/updatecategory", authMiddleware,isAdmin,updateCategory)
router.delete("/deletecategory", authMiddleware,isAdmin,deleteCategory)



module.exports = router
 
