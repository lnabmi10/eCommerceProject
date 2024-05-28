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

            if (!cart) {
                return res.status(404).json({ message: "Cart not found" })
            }

           

            for (const oneProduct of cart.products) {
                const { prodId, count,color } = oneProduct
    
                // Find the product details
                const product = await Product.findById(prodId)
    
                if (!product) {
                    
                    continue
                }
                const shop = await Shop.findById(product.shop)

            if (!shop) {
                continue
            }
            const existingOrder = allOrdersOnethisCart.find(order => order.orderShopId.toString() === shop._id.toString())
            if (existingOrder) {
                existingOrder.productsOnthisOrder.push({
                    prodId: prodId,
                    prodPrice: product.price,
                    prodQty: count,
                    prodTotal: product.price * count,
                    prodColor: color
                })
            } else {
                allOrdersOnethisCart.push({
                    orderShopId: shop._id,
                    productsOnthisOrder: [{
                        prodId: prodId,
                        prodPrice: product.price,
                        prodQty: count,
                        prodTotal: product.price * count,
                        prodColor: color
                    }],
                    DiscountonThisShop: shop.shopName
                })
            }
        }

          

           for (const oneOrder of allOrdersOnethisCart) {
            {
            console.log("shop ---------")

            
            for (const thisProduct of oneOrder.productsOnthisOrder) {
                console.log(thisProduct.prodId)
                console.log(thisProduct.prodPrice)
                console.log(thisProduct.prodQty)
                console.log(thisProduct.prodColor)
            }
            const newOrder = await Order.create({products : oneOrder.productsOnthisOrder,
                shopId : oneOrder.orderShopId,
                cartId : cart._id})
                console.log(newOrder)
            
               
            }
            }
        

        }catch(err){
            throw new Error(err)

        }   })

module.exports = {createOrders}
