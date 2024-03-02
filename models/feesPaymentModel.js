const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var feesPaymentSchema = new mongoose.Schema({
   
    feesId : {type :mongoose.Schema.Types.ObjectId ,ref : "Fees" },
    sellerPaymentId : {type :mongoose.Schema.Types.ObjectId ,ref : "SellerPayment" },

},{timestamps:true});

//Export the model
module.exports = mongoose.model('FeesPayment', feesPaymentSchema);