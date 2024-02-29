const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var couponSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        uppercase : true,
    },
    shopId : {type :mongoose.Schema.Types.ObjectId ,ref : "Shop" },

    codeCoupon:{
        type:String,
        required:true,
        unique:true,
        uppercase : true,
    },
    expiry:{
        type: Date,
        required:true,
    },
    discount:{
        type:Number,
        required:true,
    },
    productId : [{type :mongoose.Schema.Types.ObjectId ,ref : "Product" }],
    
},{timestamps:true});

//Export the model
module.exports = mongoose.model('Coupon', couponSchema);