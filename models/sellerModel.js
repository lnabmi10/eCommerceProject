const mongoose = require('mongoose'); 

var sellerSchema = new mongoose.Schema({
    
    userId : {type :mongoose.Schema.Types.ObjectId ,ref : "User" },

    identityCardImg : {
        type : Array ,
    }, 
    
    isBlocked : {
        type : Boolean,
        default : false,
    },
    isVerified : {
        type : Boolean,
        default : false,
    },
    //bank information
    bankInformation : {type :mongoose.Schema.Types.ObjectId ,ref : "BankInfo" },
    withrawalAlowed : {
        type : Boolean,
        default : false,
    },
    moneyBlocked : {
        type : Number,  
        default : 0,
    },
    shopId : [{type :mongoose.Schema.Types.ObjectId ,ref : "Shop" }],
   
    
},
{
    timestamps : true

});

module.exports = mongoose.model("Seller", sellerSchema);
