const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var feesSchema = new mongoose.Schema({
   

    title: {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
   
    
    cost: {
        type : Number,
        required : true,
    },
    
},{timestamps:true});

//Export the model
module.exports = mongoose.model('Fees', feesSchema);