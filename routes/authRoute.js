const express = require('express');
const { createUser,loginUser, getAllUser,getOneUser, DeleteOneUser,updateUser, blockUser, unBlockUser } = require('../controller/userCtrl');
const {authMiddleware, isAdmin} = require('../middlewares/authMiddleware');
const router = express.Router();



router.post("/register",createUser);
router.post("/login",loginUser);
router.get("/getAll",getAllUser);
router.get("/getOne/:id",authMiddleware,isAdmin,getOneUser);
router.delete("/deleteOne/:id",DeleteOneUser);
router.put("/update",authMiddleware ,updateUser);
router.put("/blockUser/:id",authMiddleware,isAdmin ,blockUser );
router.put("/unBlockUser/:id",authMiddleware,isAdmin ,unBlockUser);






module.exports=router;