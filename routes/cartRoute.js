const express = require('express');
const { authMiddleware} = require('../middlewares/authMiddleware');
const { addToCart, getAllCarts,getAllUserCarts, removeFromCart,findOneCart, deleteCart } = require('../controller/cartCtrl');

const router = express.Router();


router.put("/addtocart",authMiddleware,addToCart )
router.get("/getallcarts",getAllCarts )
router.get("/getallusercarts",authMiddleware,getAllUserCarts )
router.delete("/removefromcart/:productId",authMiddleware,removeFromCart)
router.delete("/deletecart/:cartId",authMiddleware,deleteCart)
router.get("/findonecart",authMiddleware,findOneCart)








module.exports = router