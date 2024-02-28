const mongoose = require('mongoose'); 
const bcrypt = require('bcrypt')
const crypto =require('crypto')
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
    },
    isBlocked : {
        type : Boolean,
        default : false,
    },
    cart :  [{type :mongoose.Schema.Types.ObjectId ,ref : "Cart" }],
    adress : {
        type:String,
        default: "",
    },
    wishlist : [{type :mongoose.Schema.Types.ObjectId ,ref : "Product" }],
    refreshToken : {
        type : String,
    },
    passwordChangedAt : Date,
    PassWordResetToken : String,
    passwordResetExpires : Date,
},
{
    timestamps : true

});

userSchema.pre('save',async function  (next) {
   if(!this.isModified('password')){
    next();
   }
    const salt =  bcrypt.genSaltSync(10)
    this.password = await bcrypt.hashSync(this.password,salt)
   
})

userSchema.methods.isPasswordMatched = async function (entredPassword){
    let resultCompare = await bcrypt.compare(entredPassword,this.password)
    return resultCompare
}
userSchema.methods.createPasswordResetToken = async function (){
    const resettoken = crypto.randomBytes(32).toString('hex')
    this.PassWordResetToken=crypto.createHash('sha256').update(resettoken).digest('hex')
    this.passwordResetExpires = Date.now()+10*60*1000 // 10  min
    return resettoken

}

//Export the model
module.exports = mongoose.model("User", userSchema);