const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim : true
    },
    slug:{
        type:String,
        required:true,
        unique:true,
        lowercase : true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    category : {
        /*
        type : mongoose.Schema.Types.ObjectId,
        ref : "Category"
        */
       type: String,
       required : true
    },
    brand : {
        type : String,
       // enum : ["brand1", "brand2" , "brand3"]
       required : true,

    },
    quantity : {
        type : Number,
        required : true,

    } ,
    sold : {
        type : Number,
        default : 0,
    },
    images : {
        type : Array ,
    },
    color :{
        type : String,
       //  enum : ["black", "Brown" , "red"]
       required : true,
    },
    rating : [{
        star : Number ,
        postedby : {type : mongoose.Schema.Types.ObjectId}
    }]


},{
    timestamps : true
});

//Export the model
module.exports = mongoose.model('Product', productSchema);