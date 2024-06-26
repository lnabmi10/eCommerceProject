const Seller = require('../models/sellerModel')
const asyncHandler = require('express-async-handler')
const valideMongodbId = require('../utils/validateMongodbId')
const User = require('../models/userModel')
const BankInfo = require('../models/bankInfoModel')
const coudinaryUploadImg = require('../utils/cloudinary')



const becomeSeller =  asyncHandler(

    async (req,res)=>{
    const {id} = req.user
    valideMongodbId(id)
    


        try{
            
        const  uploader =  (path) => {
            return  coudinaryUploadImg(path,"images")  
          }
          const urls =[]
          const files=req.files
          for (const file of files){
              const {path}=file
              
              const newPath = await uploader(path)
              
              urls.push(newPath)
            //  fs.unlinkSync(path)
  
          }
            const bankinfodoc = await BankInfo.findOne({userId : id})
            if(bankinfodoc){
                const bankID = bankinfodoc._id.toString()

                const newSeller = await Seller.create({
                    userId : id,
                    bankInformation : bankID,
                    identityCardImg : urls,
                   
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