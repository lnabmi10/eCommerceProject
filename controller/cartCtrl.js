const asyncHandler = require('express-async-handler');
const valideMongodbId = require('../utils/validateMongodbId');
const Product = require('../models/productModel')
const Cart = require('../models/cartModel')
const User = require('../models/userModel')





const addToCart = asyncHandler(
    async (req,res)=>{
        const {id}=req.user
        valideMongodbId(id)
        const prodCart=req.body;
        

        
        try {
            let findUser = await User.findById(id)

            let getPrice = await Product.findById(prodCart.prodId).select("price").exec();
        // check if user alredy have cart
        const cartAlreadyExist = await Cart.findOne({ ordredBy: findUser._id, cartStatus: "not processed" });

        if(!cartAlreadyExist){
        
            const newCart = await Cart.create({products : prodCart,
                cartTotal:(getPrice.price*prodCart.count),
               ordredBy:findUser._id})
            
                let user = await User.findByIdAndUpdate(id,
                    {$push : { cart : newCart._id}},
                    {new : true} )
                    .populate('cart');
           res.json(newCart)
        }else{
           
                   //add product to existing cart
          let productsInCart = [...cartAlreadyExist.products]
          

          for (let i = 0; i < productsInCart.length ;i++) {
            

              let {prodId , count , color} = productsInCart[i];
              prodId = prodId.toString()
             
            console.log(productsInCart[i])
            console.log("etap" + i + "##################################################################")

              if(prodId===prodCart.prodId && color === prodCart.color ){
                
                         console.log("il vas just augmenter le count")
                         productsInCart[i].count += count
                          console.log(productsInCart[i])

                         }

              else{
                productsInCart.push(prodCart);
                i++        
            }
        }
        

            const updatedCart = await Cart.findByIdAndUpdate(cartAlreadyExist._id ,{
                products:productsInCart,
                cartTotal: cartAlreadyExist.cartTotal + getPrice.price*prodCart.count,
            },{new:true})
        
        
           res.json(updatedCart)
        
         
      }
           
        } catch (error) {
            throw new Error(error)
        }
    }
)



module.exports={addToCart}