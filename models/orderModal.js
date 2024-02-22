const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema({
    products : [
        {
            product : {
                type : mongoose.Schema.Types.ObjectId,
                ref : "product",
            },
            count : Number,
            color:String,
            
        },
    ],
    paymentIntent : {},
    orderStatus : {
        type : String,
        default: "not processed",
        enum : ["not processed",
        "cash on delivery",
        "processing",
        "dispatched",
        "canceled",
        "delivered"
        ],
    },
    ordredBy : {
        type : mongoose.Schema.Types.ObjectId,
         ref : "User",
    },
    ordredFrom : {
        type : mongoose.Schema.Types.ObjectId,
         ref : "Seller",
        
    }
    
    
},{
    timestamps : true,
});

//Export the model
module.exports = mongoose.model('Order', orderSchema);