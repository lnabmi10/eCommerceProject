const { generateToken } = require('../config/jwToken');
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')


const createUser = asyncHandler( async (req,res)=>{
    const email = req.body.email;
    const findUser = await User.findOne({email:email});
    if (!findUser ){
        // create user 
        const newUser = await User.create(req.body);
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
        if (findUser && await findUser.isPasswordMatched(password)) {
            res.json(
                {_id : findUser._id,
                 firstname : findUser?.firstname,
                 lastname : findUser?.lastname,
                 email : findUser?.email,
                 mobile : findUser?.mobile,
                 token : generateToken(findUser?._id)
                }
            )
            
        }else{
            throw new Error("invalid email or password");
        }


    }
)
const getAllUser = asyncHandler (async (req,res)=>{
    try {
        const allUsers = await User.find();
        res.json(allUsers)
        
    } catch (error) {
        throw new Error(error)
        
    }

}

)
const getOneUser = asyncHandler (async (req,res)=>{
   
        const {id} = req.params;
        
        try {
            const  theUser = await User.findById(id)
            res.json(theUser)
           
            
        } catch (error) {
            throw new Error(error)
            
        }})

const DeleteOneUser = asyncHandler (async (req,res)=>{

            const {id} = req.params;
            
            try {
                const  theUser = await User.findByIdAndDelete(id)
                res.json(theUser)
               
                
            } catch (error) {
                throw new Error(error)
                
            }})
        
            const updateUser = asyncHandler (async (req,res)=>{
           

   
                const {id} = req.user;
                
                try {
                    const  theUpdatedUser = await User.findByIdAndUpdate(id,{
                        firstname : req?.body.firstname,
                        lastname : req?.body.lastname,
                        mobile : req?.body.mobile,
                        email : req?.body.email,
                    },{
                        new : true
                    })
                    res.json(theUpdatedUser)
                   
                    
                } catch (error) {
                    throw new Error(error)
                    
                }})
    



module.exports = {createUser,loginUser,getAllUser,getOneUser,DeleteOneUser,updateUser};