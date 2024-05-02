const BankInfo = require('../models/bankInfoModel')
const asyncHandler = require('express-async-handler')
const valideMongodbId = require('../utils/validateMongodbId')
const User = require('../models/userModel')
const Order = require('../models/orderModal')
const Cart = require('../models/cartModel')




const createOrder =  asyncHandler(

    async (req,res)=>{
    const {id} = req.user
    valideMongodbId(id)
    const {cartId} = req.params
    let findUser = await User.findById(id)


        try{
            const cart = Cart.findById(cartId)

            
            
            

        }catch(err){
            throw new Error(err)

        }   })

module.exports = {createOrder}
