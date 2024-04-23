const BankInfo = require('../models/bankInfoModel')
const asyncHandler = require('express-async-handler')
const valideMongodbId = require('../utils/validateMongodbId')
const User = require('../models/userModel')



const createBankDoc =  asyncHandler(

    async (req,res)=>{
    const {id} = req.user
    valideMongodbId(id)
    


        try{
            const newBankDoc = await BankInfo.create({
                bankName : req?.body.bankName,
                accountNumber : req?.body.accountNumber,
                branchCode : req?.body.branchCode,
                nameOnAccount : req?.body.nameOnAccount,
                userId : id
            })
            const  theUpdatedUser = await User.findByIdAndUpdate(id,{
                role : "client",   
            },{
                new : true
            })
            res.json(newBankDoc)

        }catch(err){
            throw new Error(err)

        }   }
)

module.exports = {createBankDoc}