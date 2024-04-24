const express = require('express');
const {isAdmin,isSeller, authMiddleware} = require('../middlewares/authMiddleware');
const {createShop}=require('../controller/shopCrtl')
const router = express.Router();



router.post("/createshop",authMiddleware,isSeller,createShop )

module.exports=router