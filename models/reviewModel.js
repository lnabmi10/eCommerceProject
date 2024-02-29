const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var reviewSchema = new mongoose.Schema({
    
    
    productId : {type :mongoose.Schema.Types.ObjectId ,ref : "Product" },
    reviewBy : {type :mongoose.Schema.Types.ObjectId ,ref : "User" },

    dateTimeReview : {type :Date,
                  required:true },
    
    content : {
        type : String,
        required : true,
    },
    
    
},{
    timestamps : true,
});

//Export the model
module.exports = mongoose.model('Review', reviewSchema);