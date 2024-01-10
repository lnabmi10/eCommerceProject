const express = require('express');
const { createUser,loginUser, getAllUser,getOneUser, DeleteOneUser,updateUser, blockUser, unBlockUser, 
    handelRefreshToken, logOut,updatePassWord, forgotPassword, resetPassword } = require('../controller/userCtrl');
const {authMiddleware, isAdmin} = require('../middlewares/authMiddleware');
const router = express.Router();



router.post("/register",createUser);
router.post("/login",loginUser);
router.post("/forgotPassword",forgotPassword)
router.put("/resetPassword/:token",resetPassword)
router.put("/password",authMiddleware,updatePassWord);
router.get("/getAll",getAllUser);
router.get("/refresh",handelRefreshToken);
router.get("/logout",logOut)
router.get("/getOne/:id",authMiddleware,isAdmin,getOneUser);
router.delete("/deleteOne/:id",DeleteOneUser);
router.put("/update",authMiddleware ,updateUser);
router.put("/blockUser/:id",authMiddleware,isAdmin ,blockUser );
router.put("/unBlockUser/:id",authMiddleware,isAdmin ,unBlockUser);






module.exports=router;