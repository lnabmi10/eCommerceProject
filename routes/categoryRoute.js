const express = require('express')
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');
const {createCategory} = require('../controller/categoryCtrl')
const router = express.Router();


router.post("/createcategory", authMiddleware,isAdmin,createCategory)



module.exports = router

