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
        
        console.log('prodCart',prodCart)  
         console.log('id',id)
        
        try {
            let findUser = await User.findById(id)

            let getPrice = await Product.findById(prodCart.prodId).select("price").exec();
        // check if user alredy have cart
        const cartAlreadyExist = await Cart.findOne({ ordredBy: findUser._id, cartStatus: "not processed" });
        const addtoTotal = getPrice.price*prodCart.count

            console.log('addtoTotal',addtoTotal)
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
const findOneCart = asyncHandler(
    async (req, res) => {
        const { id } = req.user;
        console.log(id);

        try {
        
            
            const cart = await Cart.findOne({ ordredBy: id, cartStatus: "not processed" });
            res.json(cart);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    }
);


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
const removeFromCart = asyncHandler(async (req, res) => {
    const { id } = req.user;
    const { productId } = req.params;

    try {
        const cart = await Cart.findOne({ ordredBy: id, cartStatus: "not processed" });

        if (!cart) {
            return res.status(401).send("No Cart Found");
        } else if (cart.products.length === 0) {
            return res.status(404).send('The Cart is empty');
        }

        const index = cart.products.findIndex(item => item.prodId.toString() === productId);

        if (index === -1) {
            return res.status(404).send('The Product is not in the Cart');
        }
        
        let getPrice = await Product.findById(productId).select("price").exec();

        console.log('getprice',getPrice)
        // Calculate amount to deduct from cartTotal
        const productToRemove = cart.products[index];
        const deduction = productToRemove.count * getPrice.price;
        console.log('deduction',deduction)
        console.log('cart.cartTotal',cart.cartTotal)

        // Update cartTotal
        cart.cartTotal -= deduction;

        // Remove product from cart
        cart.products.splice(index, 1);

        // Save updated cart
        await cart.save();

        res.json(cart.products);
    } catch (error) {
        throw new Error(error);
    }
});
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


module.exports={addToCart,getAllCarts,updateCartStatus,findOneCart,getAllUserCarts,removeFromCart,deleteCart }