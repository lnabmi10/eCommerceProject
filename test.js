const User = require('../models/userModel')


const createUser = async (req,res)=>{
    const email = req.body.email;
    const findUser = await User.findOne({email:email});
    if (!findUser ){
        // create user 
        const newUser = new User(req.body) ;
        newUser.save();

        res.json(newUser);
    }else{
        res.json({msg : "user aleady exist",
                  success : false
                })
    }
}
const x = 10;



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