const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

const authMiddleware = asyncHandler( async (req,res,next)=>{
    let token ;
    if (req?.headers?.authorization?.startsWith("Bearer") ){
        token = req.headers.authorization.split(' ')[1]
        try {
            if(token){
                const decoded = jwt.verify(token,process.env.JWT_SECRET)
                const user = await User.findById(decoded.id)
                console.log("decoded is ", decoded)

                req.user = user
                next()

            }

            
        } catch (error) {
            throw new Error('not autorized , token expired ,please login')
        }

    }
else{
    throw new Error (' there is no token attached to the header')}}
);

const isAdmin = asyncHandler(
    async (req,res,next)=>{
    
        const {email}=req.user
        const adminUser = await User.findOne({email})
        console.log(adminUser)
        if(adminUser.role !== "admin"){
            throw new Error('you a not an admin')

        }else{
            next()
        }
        

    }
);

module.exports = {authMiddleware,isAdmin}