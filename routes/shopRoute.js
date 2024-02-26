const express = require('express');
const {isAdmin, authMiddleware} = require('../middlewares/authMiddleware');
const {createShop}=require('../controller/shopCrtl')



router.post("/createshop",authMiddleware,isAdmin,createShop )

module.exports=Router