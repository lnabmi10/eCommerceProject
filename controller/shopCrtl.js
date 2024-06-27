const asyncHandler = require('express-async-handler');
const valideMongodbId = require('../utils/validateMongodbId');
const Shop = require('../models/shopModel')
const Seller = require('../models/sellerModel')
const User = require('../models/userModel')


const  createShop = asyncHandler(async (req, res) => {

    const {id} = req.user
    valideMongodbId(id)

    try {
        const sellerOwner = await Seller.findOne({userId : id})
        if(sellerOwner){
            const sellerID = sellerOwner._id.toString()

        const newShop = await Shop.create({
            
            shopName : req?.body.shopName,
            owner : sellerID,
            description : req?.body.description,
            category : req?.body.category,
            brand : req?.body.brand,
           
        })
        res.json(newShop)
    }

    } catch (error) {
        throw new Error(error)
    }

})



const  getYourShop = asyncHandler(async (req, res) => {

    const {id} = req.user
    valideMongodbId(id)

    try {
        const user = await User.findById(id)
        if (user.role === "seller"){
            const seller = await Seller.findOne({userId : id})
            const sellerId=seller._id
            const shop = await Shop.find({owner : sellerId})
            if(shop){

                res.json(shop)
            }
        
    }

    } catch (error) {
        throw new Error(error)
    }

})




module.exports={createShop,getYourShop}