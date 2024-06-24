const express = require('express');
const {isAdmin,isSeller, authMiddleware} = require('../middlewares/authMiddleware');
const {createShop,getYourShop}=require('../controller/shopCrtl')
const router = express.Router();



router.post("/createshop",authMiddleware,isSeller,createShop )
router.get("/getyourshop",authMiddleware,isSeller,getYourShop )

module.exports=router