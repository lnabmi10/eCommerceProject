const BankInfo = require('../models/bankInfoModel')
const asyncHandler = require('express-async-handler')
const valideMongodbId = require('../utils/validateMongodbId')
const User = require('../models/userModel')
const Order = require('../models/orderModal')
const Cart = require('../models/cartModel')
const Product = require('../models/productModel')





const createOrders =  asyncHandler(

    async (req,res)=>{
    const {id} = req.user
    valideMongodbId(id)
    const {cartId} = req.params

        try{
            let findUser = await User.findById(id)
            const cart = await Cart.findById(cartId)

            let oneProdId = cart.products[1].prodId

            const productOne = await Product.findById(oneProdId)
            res.json(productOne)




        }catch(err){
            throw new Error(err)

        }   })

module.exports = {createOrders}
