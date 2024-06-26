const mongoose = require('mongoose'); 

var clientSchema = new mongoose.Schema({
    
    userId : {type :mongoose.Schema.Types.ObjectId ,ref : "User" },

    
    bankInformation : {type :mongoose.Schema.Types.ObjectId ,ref : "BankInfo" },
  
},
{
    timestamps : true

});

module.exports = mongoose.model("Client", clientSchema);
