const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var paymentClientSchema = new mongoose.Schema({
   
    cartId : {type :mongoose.Schema.Types.ObjectId ,ref : "Cart" },

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
module.exports = mongoose.model('PaymentClient', paymentClientSchema);