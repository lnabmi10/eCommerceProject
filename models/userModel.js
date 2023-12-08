const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require('bcrypt')
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role :{
        type:String,
        default: "user",
    } 
});

userSchema.pre('save',async function  (next) {
    const salt =  bcrypt.genSaltSync(10)
    this.password = await bcrypt.hashSync(this.password,salt)
   
})
userSchema.methods.isPasswordMatched = async function (entredPassword){
    let resultCompare = await bcrypt.compare(entredPassword,this.password)
    return resultCompare
}

//Export the model
module.exports = mongoose.model("User", userSchema);