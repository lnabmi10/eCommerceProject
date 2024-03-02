const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var refoundSchema = new mongoose.Schema({
   
    reportId : {type :mongoose.Schema.Types.ObjectId ,ref : "Report" },
    orderId : [ {type :mongoose.Schema.Types.ObjectId ,ref : "Order" }],

    totalRefound : {
        type : Number,
        required : true,
        default: 0,
    },
   
},{timestamps:true});

//Export the model
module.exports = mongoose.model('Refound', refoundSchema);