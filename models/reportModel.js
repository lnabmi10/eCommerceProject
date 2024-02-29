const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var reviewSchema = new mongoose.Schema({
    
    
    reportedBy : {type :mongoose.Schema.Types.ObjectId ,ref : "User" },
    object : {
        type:String,
        default:"shop",
        enum : ["product",
                "message",
                "conversation",
               ],
    },
    objectId : {type :mongoose.Schema.Types.ObjectId },
    


    dateTimeReport : {type :Date,
                  required:true },
    
    content : {
        type : String,
        required : true,
    },
    resolution : {
        type : String,
        default :"traitement",
    }
    
    
},{
    timestamps : true,
});

//Export the model
module.exports = mongoose.model('Review', reviewSchema);