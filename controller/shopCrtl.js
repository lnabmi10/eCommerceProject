const asyncHandler = require('express-async-handler');
const valideMongodbId = require('../utils/validateMongodbId');
const Shop = require('../models/shopModel')



const  createShop = asyncHandler(async (req, res) => {
    try {
        const newShop = await Shop.create(req.body)
        res.json(newShop)

    } catch (error) {
        throw new Error(error)
    }

})




module.exports={createShop}