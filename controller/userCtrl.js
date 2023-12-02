const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')


const createUser = asyncHandler( async (req,res)=>{
    const email = req.body.email;
    const findUser = await User.findOne({email:email});
    if (!findUser ){
        // create user 
        const newUser = User.create(req.body);
        res.json(newUser);
    }else{
        //res.json({msg : "user aleady exist",
             //     success : false })
             throw new Error('user aleady exist')
               
    }
})

const loginUser = asyncHandler(
    async (req,res)=>{
        const {email,password} = req.body;
        //console.log(email,password)
        const findUser = await User.findOne({email:email})
        if (findUser && findUser.isPasswordMatched(password)) {
            res.json(findUser)
            
        }else{
            throw new Error("invalid email or password");
        }


    }
)

module.exports = {createUser,loginUser};