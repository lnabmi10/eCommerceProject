const express = require('express')
const { authMiddleware } = require('../middlewares/authMiddleware');
const {createBankDoc,getBankDetails} = require('../controller/bankInfoCtrl.js')
const router = express.Router();


router.post("/createbankinfo", authMiddleware,createBankDoc)
router.get("/getbankdetails", authMiddleware,getBankDetails)




module.exports = router
 