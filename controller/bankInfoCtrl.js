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
            const docCreted = await BankInfo.findOne({userId:id})
            console.log(docCreted)
            const  theUpdatedUser = await User.findByIdAndUpdate(id,{
                role : "client",   
                bankInformationId : docCreted.id,
            },{
                new : true
            })
            res.json(newBankDoc)
            

        }catch(err){
            throw new Error(err)

        }   })


const getBankDetails = asyncHandler(
  async (req, res) => {
    const {id} = req.user
    valideMongodbId(id)
    try {
      
      const bankDetails = await BankInfo.find({ userId: id })
      res.json(bankDetails)
      
    } catch (error) {
            throw new Error(err)
      
    }
  
     }
   )     
module.exports = {createBankDoc,getBankDetails}

