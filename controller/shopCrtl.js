const asyncHandler = require('express-async-handler');
const valideMongodbId = require('../utils/validateMongodbId');
const Shop = require('../models/shopModel')
const Seller = require('../models/sellerModel')


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






module.exports={createShop}