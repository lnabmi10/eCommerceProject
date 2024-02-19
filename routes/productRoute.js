const express = require('express');
const {createProduct, getOneProduct, getAllProducts,updateProduct, deleteProduct, addToWishList, ratingProduct, uploadProductImages} = require('../controller/productCtrl')
const {isAdmin, authMiddleware} = require('../middlewares/authMiddleware');
const { uploadImg, productImgResize } = require('../middlewares/uplodingImages');

const router = express.Router();


router.post("/createproduct",authMiddleware,isAdmin,createProduct )
router.put("/upload/:id",authMiddleware,uploadImg.array('images',10),productImgResize,uploadProductImages)
router.get("/getoneproduct/:id",getOneProduct)
router.get("/getallproducts",getAllProducts)
router.put("/updateproduct",authMiddleware,isAdmin,updateProduct)
router.put("/addproducttowishlist",authMiddleware,addToWishList)
router.put("/ratingproduct",authMiddleware,ratingProduct )
router.delete("/deleteproduct/:id",authMiddleware,isAdmin,deleteProduct)





module.exports = router