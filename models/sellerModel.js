const mongoose = require('mongoose'); 

var sellerSchema = new mongoose.Schema({
    
    userId : {type :mongoose.Schema.Types.ObjectId ,ref : "User" },

    identityCardImg : { type: String, required: true}, 
     
    role :{
        type:String,
        default: "seller",
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
    bankInformation : {
        bankName : {
            type : String,
            required  : true,
        },
        accountNumber : {
            type : Number,
            required : true,
        } ,
        branchCode : {
            type : Number,
            required :true,
        },
        nameOnAccount : {
           type : String,
           required : true,
       }
    },
    withrawalAlowed : {
        type : Boolean,
        default : false,
    },
    moneyBlocked : {
        type : Number,  
        default : 0,
    },
    shopId : {type :mongoose.Schema.Types.ObjectId ,ref : "Shop" },
   
    
},
{
    timestamps : true

});

module.exports = mongoose.model("Seller", sellerSchema);
