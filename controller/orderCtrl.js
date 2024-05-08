const BankInfo = require('../models/bankInfoModel')
const asyncHandler = require('express-async-handler')
const valideMongodbId = require('../utils/validateMongodbId')
const User = require('../models/userModel')
const Order = require('../models/orderModal')
const Cart = require('../models/cartModel')
const Product = require('../models/productModel')
const Shop = require('../models/shopModel')





const createOrders =  asyncHandler(

    async (req,res)=>{
    const {id} = req.user
    valideMongodbId(id)
    const {cartId} = req.params

        try{
            let allOrdersOnethisCart = []
            
            let findUser = await User.findById(id)
            const cart = await Cart.findById(cartId)
            numberOfProduct = cart.products.length


            let oneProdId = cart.products[0].prodId

            const productOne = await Product.findById(oneProdId)
            let shopId = productOne.shop
            let shopOne = await Shop.findById(shopId)

            allOrdersOnethisCart.push({
            orderShopId : shopOne.id.toString(),
            productsOnthisOrder : [{prodId: oneProdId,
                                    prodPrice: productOne.price,
                                    prodQty: cart.products[0].count,
                                    prodTotal: productOne.price * cart.products[0].count,
                                    prodColor : productOne.color  }
                                ],
            DiscountonThisShop : shopOne.shopName,
             
           })

           for (let i = 1; i < numberOfProduct; i++) {

            let oneOtherProd = cart.products[i].prodId
            const productOther = await Product.findById(oneOtherProd)
            let shopId = productOther.shop
            let shopOther = await Shop.findById(shopId)
            let isShopInOrders = false
            for (let j = 0; j < allOrdersOnethisCart.length; j++) {
                if(shopId === allOrdersOnethisCart[j].orderShopId ){
                    allOrdersOnethisCart[j].productsOnthisOrder.push({prodId: oneOtherProd,
                                                                    prodPrice: productOther.price,
                                                                    prodQty: cart.products[i].count,
                                                                    prodTotal: productOther.price * cart.products[i].count,
                                                                    prodColor : productOther.color  }
                                                               )}
                else {
                    allOrdersOnethisCart.push({
                        orderShopId : shopId,
                        productsOnthisOrder : [{prodId: oneProdId,
                                                prodPrice: productOther.price,
                                                prodQty: cart.products[i].count,
                                                prodTotal: productOther.price * cart.products[i].count,
                                                prodColor : productOther.color  }
                                            ],
                        DiscountonThisShop : shopOther.shopName,
                         
                       })
                }
                
           }            }

           res.json(allOrdersOnethisCart)




        }catch(err){
            throw new Error(err)

        }   })

module.exports = {createOrders}
