const mongoose = require('mongoose'); 

var bankInfoSchema = new mongoose.Schema({
    
   
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
    },
    userId : {type :mongoose.Schema.Types.ObjectId ,ref : "User" },

    
    isVerified : {
        type : Boolean,
        default : false,
    },    
},
{
    timestamps : true

});

module.exports = mongoose.model("BankInfo", bankInfoSchema);
