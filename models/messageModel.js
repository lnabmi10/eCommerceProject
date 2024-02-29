const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var messageSchema = new mongoose.Schema({
   
    conversationId : {type :mongoose.Schema.Types.ObjectId ,ref : "Conversation" },

    dateTime: {
        type : Date,
        required : true,
    },
    content : {
        type : String,
        required : true,
    },
   
    sendById : {type :mongoose.Schema.Types.ObjectId ,ref : "User" },
    isReported : {
        type : Boolean,
        default : false,
    },
    
    
},{timestamps:true});

//Export the model
module.exports = mongoose.model('Message', messageSchema);