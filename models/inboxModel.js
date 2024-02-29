const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var inboxSchema = new mongoose.Schema({
   
    userId : {type :mongoose.Schema.Types.ObjectId ,ref : "User" },
    
    messageId : [{type :mongoose.Schema.Types.ObjectId ,ref : "Message" }],
    
},{timestamps:true});

//Export the model
module.exports = mongoose.model('Inbox', inboxSchema);