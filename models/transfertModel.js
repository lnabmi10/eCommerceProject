const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var transfertSchema = new mongoose.Schema({
   
    shopId : {type :mongoose.Schema.Types.ObjectId ,ref : "Shop" },

    dateTime: {
        type : Date,
        required : true,
    },
    total : {
        type : Number,
        required : true,
        default : 0,
    },
    
},{timestamps:true});

module.exports = mongoose.model('Transfert', transfertSchema);
