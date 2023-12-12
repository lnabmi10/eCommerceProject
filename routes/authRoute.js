const express = require('express');
const { createUser,loginUser, getAllUser,getOneUser, DeleteOneUser,updateUser } = require('../controller/userCtrl');
const router = express.Router();



router.post("/register",createUser);
router.post("/login",loginUser);
router.get("/getAll",getAllUser);
router.get("/getOne/:id",getOneUser);
router.delete("/deleteOne/:id",DeleteOneUser);
router.put("/update/:id",updateUser);






module.exports=router;