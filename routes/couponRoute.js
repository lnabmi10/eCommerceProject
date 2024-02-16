const express = require('express')
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');
const {createCoupon}= require('../controller/couponCtrl')

const router = express.Router();



router.post("/createcoupon", authMiddleware,isAdmin,createCoupon)


module.exports=router;