const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var shopSchema = new mongoose.Schema({
    shopName:{
        type:String,
        required:true,
        trim : true
    },
    owner :{type :mongoose.Schema.Types.ObjectId ,  ref : "Seller" },
    feesStatus : { type : Number,
        defaults:0},
    
    
    isVerified : {
        type : Boolean,
        default : false,
    },
    
    description:{
        type:String,
        required:true,
    },
    
    category : {
      
       type: String,
       required : false
    },
    brand : {
        type : String,
       // enum : ["brand1", "brand2" , "brand3"]
       required : false,

    },
    products :[{type :mongoose.Schema.Types.ObjectId ,ref : "Product" }],
    shopPolicies : [{
        type : String,
    }],
    shopMembers : [{
        memberName :{ type:String,
                    required:true},
        memberRole : { type : String,
                     required :true
        },
        memberDescription : { type : String ,
                             required : false
        }
    }],



},{
    timestamps : true
});

//Export the model
module.exports = mongoose.model('Shop', shopSchema);