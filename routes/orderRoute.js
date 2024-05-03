const express = require('express')
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');
const {createOrders} = require('../controller/orderCtrl')
const router = express.Router();


router.post("/createOrders/:cartId", authMiddleware,createOrders)




module.exports = router