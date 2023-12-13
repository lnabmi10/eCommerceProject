const express = require('express');
const { createUser,loginUser, getAllUser,getOneUser, DeleteOneUser,updateUser } = require('../controller/userCtrl');
const {authMiddleware, isAdmin} = require('../middlewares/authMiddleware');
const router = express.Router();



router.post("/register",createUser);
router.post("/login",loginUser);
router.get("/getAll",getAllUser);
router.get("/getOne/:id",authMiddleware,isAdmin,getOneUser);
router.delete("/deleteOne/:id",DeleteOneUser);
router.put("/update",authMiddleware ,updateUser);






module.exports=router;