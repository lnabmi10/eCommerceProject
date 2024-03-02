const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var pubPaymentSchema = new mongoose.Schema({
   
    pubId : {type :mongoose.Schema.Types.ObjectId ,ref : "Pub" },
    sellerPaymentId :  {type :mongoose.Schema.Types.ObjectId ,ref : "SellerPayment" },

    
},{timestamps:true});

//Export the model
module.exports = mongoose.model('PubPayment', pubPaymentSchema);