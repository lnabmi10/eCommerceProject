const express = require('express');
const {isAdmin,isSeller, authMiddleware} = require('../middlewares/authMiddleware');
const {createShop,getYourShop,addShopImage}=require('../controller/shopCrtl');
const { usersImgResize, uploadImg } = require('../middlewares/uplodingImages');
const router = express.Router();



router.post("/createshop",authMiddleware,isSeller,createShop )
router.get("/getyourshop",authMiddleware,getYourShop )
router.put("/addimageshop/:shopId",authMiddleware,uploadImg.single('images'),usersImgResize,addShopImage )

module.exports=router