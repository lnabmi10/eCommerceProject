const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var inboxSchema = new mongoose.Schema({
   
    inboxId : {type :mongoose.Schema.Types.ObjectId ,ref : "Inbox" },

    dateTimeFistmessage: {
        type : Date,
        required : true,
    },
    dateTimeLastUpdate : {
        type : Date,
        required : true,
    },
   
    messageId : [{type :mongoose.Schema.Types.ObjectId ,ref : "Message" }],
    isReported : {
        type : Boolean,
        default : false,
    },
    isBlocked : {
        type : Boolean,
        default : false,
    },
    
},{timestamps:true});

//Export the model
module.exports = mongoose.model('Inbox', inboxSchema);