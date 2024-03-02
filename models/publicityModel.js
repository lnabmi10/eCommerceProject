const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var publicitySchema = new mongoose.Schema({
   
    shopId : {type :mongoose.Schema.Types.ObjectId ,ref : "Shop" },
    productId : [ {type :mongoose.Schema.Types.ObjectId ,ref : "Product" }],

    dateBiginning: {
        type : Date,
        required : true,
    },
    costPerday : {
        type : Number,
        required : true,
        default: 0,
    },
   
    
    dateEnd: {
        type : Date,
        required : true,
    },
    
},{timestamps:true});

//Export the model
module.exports = mongoose.model('Publicity', publicitySchema);