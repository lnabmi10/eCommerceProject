const Seller = require('../models/sellerModel')
const asyncHandler = require('express-async-handler')
const valideMongodbId = require('../utils/validateMongodbId')
const User = require('../models/userModel')
const BankInfo = require('../models/bankInfoModel')


const becomeSeller =  asyncHandler(

    async (req,res)=>{
    const {id} = req.user
    valideMongodbId(id)
    


        try{
            const bankinfodoc = await BankInfo.findOne({userId : id})
            if(bankinfodoc){
                const bankID = bankinfodoc._id.toString()

                const newSeller = await Seller.create({
                    userId : id,
                    bankInformation : bankID,
                    identityCardImg : req?.body.identityCardImg,
                   
                })
                const  theUpdatedUser = await User.findByIdAndUpdate(id,{
                    role : "seller",   
                },{
                    new : true
                })
                res.json(newSeller)
                
            }
           
        }catch(err){
            throw new Error(err)

        }   }
)

module.exports = {becomeSeller}