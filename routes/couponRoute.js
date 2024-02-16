const express = require('express')
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');
const {createCoupon,getAllCoupons,updateCoupon,deleteCoupon, getOneCoupon}= require('../controller/couponCtrl')

const router = express.Router();



router.post("/createcoupon", authMiddleware,isAdmin,createCoupon)
router.get("/getallcoupons", authMiddleware,getAllCoupons)
router.put("/updatecoupon/:id", authMiddleware,isAdmin,updateCoupon)
router.delete("/deletecoupon/:id", authMiddleware,isAdmin,deleteCoupon)
router.get("/getonecoupon/:id",getOneCoupon )



module.exports=router;