const express = require('express');
const {createProduct, getOneProduct, getAllProducts,updateProduct, deleteProduct} = require('../controller/productCtrl')
const router = express.Router();

router.post("/createproduct",createProduct )
router.get("/getoneproduct/:id",getOneProduct)
router.get("/getallproducts",getAllProducts)
router.put("/updateproduct",updateProduct)
router.delete("/deleteproduct/:id",deleteProduct)



module.exports = router