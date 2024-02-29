const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var annoncementSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
        unique:true,
    },

    numberOfViews:{
        type:Number,
        default:0,
    },
    
},{
    
    timestamps : true,
});

//Export the model
module.exports = mongoose.model('Annoncement', annoncementSchema);