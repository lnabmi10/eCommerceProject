const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var deliverySchema = new mongoose.Schema({
    
    
    orderId : {type :mongoose.Schema.Types.ObjectId ,ref : "order" },


    deliveryStatus : {
        type : String,
        default: "not processed",
        enum : ["not processed",
        "processing",
        "returned",
        "delivered"
        ],
    },
    trackingNumber : {
        type : String,
        required : true,
    },
    
    
},{
    timestamps : true,
});

//Export the model
module.exports = mongoose.model('Delivery', deliverySchema);