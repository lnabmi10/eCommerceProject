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
        const addtoTotal = getPrice.price*prodCart.count

        if(!cartAlreadyExist){
        
            const newCart = await Cart.create({products : prodCart,
                cartTotal : addtoTotal,
               ordredBy : findUser._id})
            
                let user = await User.findByIdAndUpdate(id,
                    {$push : { cart : newCart._id}},
                    {new : true} );
           res.json(newCart)
        }else{
           
                   //add product to existing cart
          let productsInCart = [...cartAlreadyExist.products]
          let indexProd = -1

          for (let i = 0; i < productsInCart.length ;i++) {
            

              let {prodId , count , color} = productsInCart[i];
              prodId = prodId.toString()
             

              if(prodId===prodCart.prodId && color === prodCart.color ){
                
                         productsInCart[i].count += prodCart.count
                          console.log(productsInCart[i])
                          indexProd = i

                         }
        }
        if(indexProd==-1){
            productsInCart.push(prodCart)
        }
        

            const updatedCart = await Cart.findByIdAndUpdate(cartAlreadyExist._id ,{
                products:productsInCart,
                cartTotal: cartAlreadyExist.cartTotal + addtoTotal,
            },{new:true})
        
        
           res.json(updatedCart)
        
         
      }
           
        } catch (error) {
            throw new Error(error)
        }
    }
)



const getAllUserCarts = asyncHandler(async(req,res)=>{
    const {id} = req.user
    valideMongodbId(id)

    try {
        let userCart  = await Cart.find({ordredBy: id})
    
        res.json(userCart)
        
    } catch (error) {
        throw new Error(error)
    }}

)
const getAllCarts = asyncHandler(async(req,res)=>{
   

    try {
        let userCart  = await Cart.find({})
    
        res.json(userCart)
        
    } catch (error) {
        throw new Error(error)
    }}

)
const deleteCart = asyncHandler(async(req,res)=>{
    const {cartId} = req.params
    const {id}=req.user
    try {
    const findcart = await Cart.findOne({_id : cartId , ordredBy : id })
    if(!findcart){
    const deletedCart = await Cart.findByIdAndDelete(cartId)
    res.json(deletedCart)
    }
    } catch (error) {
        throw new Error(error)
        
    }
})

// remove product from cart
const removeFromCart= asyncHandler(
    async (req,res)=> {

        const {id}=req.user
        const  {productId} = req.params;
        const cart = await Cart.findOne({orderdBy:id, cartStatus: "not processed"})
         console.log("this is the cart",cart.products);
        if (!cart) {
            return res.status(401).send("No Cart Found")
          } else if (cart.products.length==0) {
              return res.status(404).send('The Cart is emty')
              
          } 
          let productsInCart = [...cart.products]
          
          let index = productsInCart.indexOf(productId)
          console.log(index)
          
          if (index === -1 ) {
              return res.status(404).send('The Product is not in the Cart')
          }
          // remove item from array using filter() method
          cart.products = cart.products.filter((item)=> item.toString()!==productId)
          await cart.save()
          res.json(cart.products)
      }
    
   );
   // changement de l status de la cart
const updateCartStatus = asyncHandler(async (req,res)=>{
    const {id} = req.user;
    valideMongodbId(id)
    const {status} = req.body;
    const {cartId} = req.params

    try {
        
    const  cart = await Cart.findByIdAndUpdate(cartId ,{cartStatus : status},{new:true});
    

        res.json(cart)
    } catch (error) {
        throw new Error(error)

    }

})


module.exports={addToCart,getAllCarts,getAllUserCarts,removeFromCart,deleteCart }