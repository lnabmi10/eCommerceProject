const express = require('express');
const {isAdmin, authMiddleware} = require('../middlewares/authMiddleware');
const {createShop}=require('../controller/shopCrtl')
const router = express.Router();



router.post("/createshop",authMiddleware,isAdmin,createShop )

module.exports=router