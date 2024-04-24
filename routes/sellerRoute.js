const express = require('express')
const { authMiddleware,isClient } = require('../middlewares/authMiddleware');
const {becomeSeller} = require('../controller/sellerCtrl.js')
const router = express.Router();


router.post("/becomeseller", authMiddleware,isClient,becomeSeller)




module.exports = router
 