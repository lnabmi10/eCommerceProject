const express = require('express');
const {createProduct, getOneProduct, getAllProducts} = require('../controller/productCtrl')
const router = express.Router();

router.post("/createproduct",createProduct )
router.get("/getoneproduct/:id",getOneProduct)
router.get("/getallproducts",getAllProducts)



module.exports = router