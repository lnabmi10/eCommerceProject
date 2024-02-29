const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var notificationSchema = new mongoose.Schema({
   
    sendById : {type :mongoose.Schema.Types.ObjectId ,ref : "Admin" },
    sendTo : {type :mongoose.Schema.Types.ObjectId ,ref : "User" },

    dateTime: {
        type : Date,
        required : true,
    },
    content : {
        type : String,
        required : true,
    },
   
    isClicked : {
        type : Boolean,
        default : false,
    },
    
    
},{timestamps:true});

//Export the model
module.exports = mongoose.model('Notification', notificationSchema);