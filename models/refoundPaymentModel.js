const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var refoundPaymentSchema = new mongoose.Schema({
   
    orderId : {type :mongoose.Schema.Types.ObjectId ,ref : "Order" },
    refoundId : {type :mongoose.Schema.Types.ObjectId ,ref : "Refound" },
    sellerPaymentId : [ {type :mongoose.Schema.Types.ObjectId ,ref : "SellerPayment" }],

    
    
},{timestamps:true});

//Export the model
module.exports = mongoose.model('RefoundPayment', refoundPaymentSchema);