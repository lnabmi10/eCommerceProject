const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const Seller = require('../models/sellerModel')
const Shop = require('../models/shopModel')
const Product = require('../models/productModel')



const authMiddleware = asyncHandler( async (req,res,next)=>{
    let token ;
    if (req?.headers?.authorization?.startsWith("Bearer") ){
        token = req.headers.authorization.split(' ')[1]
        try {
            if(token){
                const decoded = jwt.verify(token,process.env.JWT_SECRET)
                const user = await User.findById(decoded.id)

                req.user = user 
                next()
            }

            
        } catch (error) {
            throw new Error('not autorized , token expired or not exists ,please login')
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
const isClient = asyncHandler(
    async (req,res,next)=>{
    
        const {email}=req.user
        const clientUser = await User.findOne({email})
        console.log(clientUser)
        if(clientUser.role !== "client"){
            throw new Error('you a not an client')

        }else{
            next()
        }
        

    }
);
const isSeller = asyncHandler(
    async (req,res,next)=>{
    
        const {email}=req.user
        const sellerUser = await User.findOne({email})
        if(sellerUser.role !== "seller"){
            throw new Error('you a not an seller')

        }else{
            next()
        }
        

    }
);
const isShopOwner = asyncHandler(
    async (req,res,next)=>{
        const {shopid}=req.params
        const {id}=req.user

        const shop = await Shop.findById(shopid)
        
        const sellerUser = await Seller.findOne({ userId :id })

        

        if(shop.owner.toString() !== sellerUser._id.toString()){
            throw new Error('it s not your shop')

        }else{
            next()
        }
        

    }
);
const isProductSeller = asyncHandler(
    async (req,res,next)=>{
        const {email}=req.user
        const {id} = req.body;
        const findProduct = await Product.findById(id)
        const sellerUser = await User.findOne({email})
        const productSeller = await Seller.findOne({ userId :sellerUser.id })
        const shop = await Shop.findById(findProduct.shop)



if(shop.owner.toString() !== productSeller.id.toString()){
   throw new Error('it s not your shop')

}else{
   next()
}
        

    }
);



module.exports = {authMiddleware,isAdmin,isClient,isSeller,isShopOwner,isProductSeller}