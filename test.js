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

          console.log(allOrdersOnethisCart)
          for (let i = 1; i < numberOfProduct; i++) {

           let oneOtherProd = cart.products[i].prodId
           const productOther = await Product.findById(oneOtherProd)
           let shopId = productOther.shop
           let shopOther = await Shop.findById(shopId)
           console.log(shopId)
           for (let j = 0; j < numberOfProduct; j++) {
               if(shopId.toString() === allOrdersOnethisCart[j].orderShopId ){
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