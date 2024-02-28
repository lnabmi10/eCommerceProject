const Coupon = require('../models/couponModel')
const asyncHandler = require('express-async-handler');
const valideMongodbId = require('../utils/validateMongodbId');

const  createCoupon = asyncHandler(async (req, res) => {
    try {
        const newCoupon = await Coupon.create(req.body)
        res.json(newCoupon)

    } catch (error) {
        throw new Error(error);
    }

})

const getAllCoupons = asyncHandler(async(req,res)=>{
    try {
    const allCoupons = await Coupon.find()
    res.json(allCoupons)

        
    } catch (error) {
        throw new Error(error)
    }


})


const updateCoupon = asyncHandler(async(req,res)=>{
    const {id}=req.params
    valideMongodbId(id)

        try {
            const updatedCoupon = await Coupon.findByIdAndUpdate(id,req.body,{new:true})
            res.json(updatedCoupon)
    
        } catch (error) {
            throw new Error(error)
        }})

const deleteCoupon = asyncHandler(async(req,res)=>{
            const {id}=req.params
            valideMongodbId(id)

                try {
                    const deletedCoupon = await Coupon.findByIdAndDelete(id)
                    res.json(deletedCoupon)
            
                } catch (error) {
                    throw new Error(error)
                }})

const getOneCoupon = asyncHandler(async(req,res)=>{
                    const {id} = req.params
                    valideMongodbId(id)
                
                    try {
                    const theCoupon = await Coupon.findById(id)
                    res.json(theCoupon)
                
                        
                    } catch (error) {
                        throw new Error(error)
                    }}
                
                )
const applayCoupon = asyncHandler(async(req,res)=>{

    const {coupon}=req.body
    try {
    const validateCoupon = await Coupon.findOne({codeCoupon:coupon})
    res.json(validateCoupon)

        
    } catch (error) {
        throw new Error(error)
        
    }


})
    


module.exports={createCoupon,getAllCoupons,updateCoupon,deleteCoupon,getOneCoupon,applayCoupon}