const mongoose = require('mongoose'); 

var superAdminSchema = new mongoose.Schema({
    
    userId : {type :mongoose.Schema.Types.ObjectId ,ref : "User" },

    adminId :{type :mongoose.Schema.Types.ObjectId ,ref : "Admin"},
   
},
{
    timestamps : true

});

module.exports = mongoose.model("SuperAdmin", superAdminSchema);
