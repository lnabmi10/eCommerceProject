const express = require('express');
const {createProduct, getOneProduct, getAllProducts,updateProduct, deleteProduct, addToWishList, ratingProduct} = require('../controller/productCtrl')
const {isAdmin, authMiddleware} = require('../middlewares/authMiddleware')

const router = express.Router();


router.post("/createproduct",authMiddleware,isAdmin,createProduct )
router.get("/getoneproduct/:id",getOneProduct)
router.get("/getallproducts",getAllProducts)
router.put("/updateproduct",authMiddleware,isAdmin,updateProduct)
router.put("/addproducttowishlist",authMiddleware,addToWishList)
router.put("/ratingproduct",authMiddleware,ratingProduct )
router.delete("/deleteproduct/:id",authMiddleware,isAdmin,deleteProduct)





module.exports = router