const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var paymentSellerSchema = new mongoose.Schema({
   
    shopId : {type :mongoose.Schema.Types.ObjectId ,ref : "Shop" },

    dateTime: {
        type : Date,
        required : true,
    },
    devise : {
        type : String,
        required : true,
    },
   
    isConfirmed : {
        type : Boolean,
        default : false,
    },
    
    
},{timestamps:true});

//Export the model
module.exports = mongoose.model('PaymentSeller', paymentSellerSchema);