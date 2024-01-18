const express = require('express')
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');
const {createBrand,updateBrand,deleteBrand, getAllBrands,getOneBrand} = require('../controller/brandCtrl')
const router = express.Router();


router.post("/createbrand", authMiddleware,isAdmin,createBrand)
router.put("/updatebrand/:id", authMiddleware,isAdmin,updateBrand)
router.delete("/deletebrand/:id", authMiddleware,isAdmin,deleteBrand)
router.get("/getallbrands",getAllBrands )
router.get("/getonebrand/:id",getOneBrand )



module.exports = router
 