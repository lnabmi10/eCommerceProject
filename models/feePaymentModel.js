const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var feePaymentSchema = new mongoose.Schema({
   
    feeId : {type :mongoose.Schema.Types.ObjectId ,ref : "Fee" },
    sellerPaymentId : {type :mongoose.Schema.Types.ObjectId ,ref : "SellerPayment" },

},{timestamps:true});

//Export the model
module.exports = mongoose.model('FeePayment', feePaymentSchema);