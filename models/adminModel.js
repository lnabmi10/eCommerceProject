const mongoose = require('mongoose'); 

var adminSchema = new mongoose.Schema({
    
    userId : {type :mongoose.Schema.Types.ObjectId ,ref : "User" },

    identity: [{ type: String, required: true}], 
     
    role :{
        type:String,
        default: "admin",
    },
    blogId : {type :mongoose.Schema.Types.ObjectId ,ref : "Blog" },
    reportId : {type :mongoose.Schema.Types.ObjectId ,ref : "Report" },
    annoncementId : {type :mongoose.Schema.Types.ObjectId ,ref : "Annoncement" },
   isSuspended :{
        type : Boolean,
        default : true,
   }
    
},
{
    timestamps : true

});

module.exports = mongoose.model("Admin", adminSchema);
