const { generateToken } = require('../config/jwToken');
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler');
const valideMongodbId = require('../utils/validateMongodbId');
const {generateRefreshToken} = require('../config/refreshToken')

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
            const refreshToken = await generateRefreshToken(findUser?._id)
            const updateUser = await User.findByIdAndUpdate(
                findUser.id,
                {refreshToken:refreshToken},
                {new:true }
                );

            res.cookie("refreshToken", refreshToken, {
                httpOnly:true,
                maxAge:72*60*60*1000
            })
            console.log(refreshToken)
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

const handelRefreshToken = asyncHandler(
    async (req, res) => {
        console.log("11111")
        const cook = req.cookies; // Using cookie-parser
       

        console.log(cook);
    }
);


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
        valideMongodbId(id);
        try {
            const  theUser = await User.findById(id)
            res.json(theUser)
           
            
        } catch (error) {
            throw new Error(error)
            
        }})

const DeleteOneUser = asyncHandler (async (req,res)=>{

            const {id} = req.params;
            valideMongodbId(id)
            
            try {
                const  theUser = await User.findByIdAndDelete(id)
                res.json(theUser)
               
                
            } catch (error) {
                throw new Error(error)
                
            }})
        
            const updateUser = asyncHandler (async (req,res)=>{
           

   
                const {id} = req.user;
                valideMongodbId(id);
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

const blockUser = asyncHandler(
                    async (req,res)=>{
                        const {id} = req.params
                        valideMongodbId(id);
                        try {
                            const blokedUser =await User.findByIdAndUpdate(id,{
                                isBlocked : true

                            },
                            {new : true}
                            )
                            res.json({
                                message :  " user blocked"})
                            

                        } catch (error) {
                            throw new Error(error)
                        }
                    }
                )
const unBlockUser = asyncHandler(
                    async (req,res)=>{
                        const {id} = req.params
                        valideMongodbId(id);
                        try {
                            const unblokedUser =await User.findByIdAndUpdate(
                                id,
                                { isBlocked : false  },
                                {new : true}
                            )
                            res.json({
                                message :  " user unblocked"})
                            

                        } catch (error) {
                            throw new Error(error)
                        }
                    }
                )
    



module.exports = {createUser,loginUser,getAllUser,getOneUser,DeleteOneUser,updateUser,blockUser,unBlockUser,handelRefreshToken};