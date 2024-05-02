const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var cartSchema = new mongoose.Schema({
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
    
    cartTotal : Number,
    totalAfterDiscount : Number,
    cartStatus : {
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
   
    
    },{
    timestamps : true,
});

//Export the model
module.exports = mongoose.model('Cart', cartSchema);