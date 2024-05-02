const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema({
    products : [
        {
            prodId : {
                type : mongoose.Schema.Types.ObjectId,
                ref : "product",
            },
            count : Number,
            color : String,
            
                    },
    ],

    
    shopId : {type :mongoose.Schema.Types.ObjectId ,ref : "Shop" },
    cartId : {type :mongoose.Schema.Types.ObjectId ,ref : "Cart" },
    deliveryId : {type :mongoose.Schema.Types.ObjectId ,ref : "Delivery" },
    isCanceled : {
        type : Boolean,
        default : false,
    },
    orderTotal : Number,
    
},{
    timestamps : true,
});

//Export the model
module.exports = mongoose.model('Order', orderSchema);