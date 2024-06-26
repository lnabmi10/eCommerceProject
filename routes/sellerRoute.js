const express = require('express')
const { authMiddleware,isClient } = require('../middlewares/authMiddleware');
const {becomeSeller} = require('../controller/sellerCtrl.js')
const router = express.Router();
const { uploadImg, usersImgResize } = require('../middlewares/uplodingImages');


router.post("/becomeseller", authMiddleware,isClient,uploadImg.array('images',1),usersImgResize,becomeSeller)




module.exports = router
 