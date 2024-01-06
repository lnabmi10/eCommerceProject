const { generateToken } = require('../config/jwToken');
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler');
const valideMongodbId = require('../utils/validateMongodbId');
const {generateRefreshToken} = require('../config/refreshToken');
const jwt = require('jsonwebtoken');
const sendEmail = require('./emailCtrl');

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
        const cookie = req.cookies; 
        if(!cookie?.refreshToken) throw new Error(' the is no refresh token')
        const refreshToken = cookie.refreshToken;
        console.log(refreshToken);
        const user = await User.findOne({refreshToken})
        if(!user) throw new Error("no refresh token in db ")
        jwt.verify(refreshToken,process.env.JWT_SECRET,(err,decoded)=>{
    if(err || user.id !== decoded.id){
        throw new Error("there is somethimg wrong with refresh token ")
    }
    const accessToken = generateToken(user.id)
    res.json(accessToken)


    })});

    // log_out fonctionality

const logOut = asyncHandler(async (req,res)=>{
    
    const cookie = req.cookies; 
    if(!cookie?.refreshToken) throw new Error(' the is no refresh token')
    const refreshToken = cookie.refreshToken;

    const user = await User.findOne({refreshToken})
    if(!user){
        res.clearCookie("refreshToken",{
            httpOnly : true,
            secure : true,
        })
        return res.sendStatus(204)
    }
    await User.findOneAndUpdate({refreshToken},{
        refreshToken : '',
    })

    res.clearCookie("refreshToken",{
        httpOnly : true,
        secure : true,
    })
    res.sendStatus(204)

})


const getAllUser = asyncHandler (async (req,res)=>{
    try {
        const allUsers = await User.find();
        res.json(allUsers)
        
    } catch (error) {
        throw new Error(error)
        
    }
})


//
// get one user 
//

const getOneUser = asyncHandler (async (req,res)=>{
   
        const {id} = req.params;
        valideMongodbId(id);
        try {
            const  theUser = await User.findById(id)
            res.json(theUser)
           
            
        } catch (error) {
            throw new Error(error)
            
        }})

        //
        // delete user
        //

const DeleteOneUser = asyncHandler (async (req,res)=>{

            const {id} = req.params;
            valideMongodbId(id)
            
            try {
                const  theUser = await User.findByIdAndDelete(id)
                res.json(theUser)
               
                
            } catch (error) {
                throw new Error(error)
                
            }})
            
            //
            // update user info
            //
        
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
 
                //
                // block user    
                //

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
                // deblock user
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

const updatePassWord = asyncHandler(async(req,res) =>{
    const {_id}=req.user;

    const {password} = req.body;

    valideMongodbId(_id)

    let findedUser = await User.findById(_id)
    if(password){
        findedUser.password=password

        const updatedPassword = await findedUser.save()

        console.log("updatedPassword",updatedPassword)

        res.json(updatedPassword)
    }else{
        res.json(findedUser)
    }

})

const forgotPassword = asyncHandler(async(req,res)=>{

    const { email } = req.body
    const findedUser = await User.findOne({email : email})
    if(!findedUser) throw new Error(" this user did not exist")
    try {
        const token = await findedUser.createPasswordResetToken()
        await findedUser.save()
        const resetURL = `follow this link to reset your password, this link is valid till 10 min <a href='http://localhost:3000/api/user/resetpassword/${token} ' > click here </a>`
        const data = {
            to : email,
            subject : "forgot password link, ",
            text : " hello  "+ resetURL,
            htm : resetURL,
        }
        sendEmail(data)
        res.json(token)
    } catch (error) {
        throw new Error(error)
    }
} )
    



module.exports = {createUser,loginUser,getAllUser,getOneUser,DeleteOneUser,updateUser,
    blockUser,unBlockUser,handelRefreshToken,logOut,updatePassWord,forgotPassword};