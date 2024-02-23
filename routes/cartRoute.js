const express = require('express');
const { authMiddleware} = require('../middlewares/authMiddleware');
const { addToCart } = require('../controller/cartCtrl');

const router = express.Router();


router.put("/addtocart",authMiddleware,addToCart )








module.exports = router