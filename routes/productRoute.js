const express = require('express');
const {createProduct, getOneProduct, getAllProducts,updateProduct, deleteProduct, addToWishList, ratingProduct, uploadProductImages} = require('../controller/productCtrl')
const {isAdmin, authMiddleware,isShopOwner,isProductSeller} = require('../middlewares/authMiddleware');
const { uploadImg, productImgResize } = require('../middlewares/uplodingImages');

const router = express.Router();


router.post("/createproduct/:shopid",authMiddleware,isShopOwner,createProduct )
router.put("/upload/:id",authMiddleware,isProductSeller,uploadImg.array('images',10),productImgResize,uploadProductImages)
router.get("/getoneproduct/:id",getOneProduct)
router.get("/getallproducts",getAllProducts)
router.put("/updateproduct/:id",authMiddleware,isProductSeller,updateProduct)
router.put("/addproducttowishlist",authMiddleware,addToWishList)
router.put("/ratingproduct",authMiddleware,ratingProduct )
router.delete("/deleteproduct/:id",authMiddleware,isProductSeller,deleteProduct)




module.exports = router