const express = require('express')
const { authMiddleware } = require('../middlewares/authMiddleware');
const {createBankDoc} = require('../controller/bankInfoCtrl.js')
const router = express.Router();


router.post("/createbankinfo", authMiddleware,createBankDoc)




module.exports = router
 