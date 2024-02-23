const express = require('express');
const { authMiddleware} = require('../middlewares/authMiddleware');
const { addToCart, getAllCarts,getAllUserCarts, removeFromCart, deleteCart } = require('../controller/cartCtrl');

const router = express.Router();


router.put("/addtocart",authMiddleware,addToCart )
router.get("/getallcarts",getAllCarts )
router.get("/getallusercarts",authMiddleware,getAllUserCarts )
router.delete("/getallusercarts/:cartId",authMiddleware,removeFromCart)
router.delete("/deletecart/:cartId",authMiddleware,deleteCart)








module.exports = router