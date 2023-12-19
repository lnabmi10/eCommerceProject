const Product = require('../models/productModel')
const asyncHandler = require('express-async-handler')
const valideMongodbId = require('../utils/validateMongodbId')


// create Product 
const createProduct =  asyncHandler(
    async (req,res)=>{
        try{
            const newProduct = await Product.create(req.body)
            res.json(newProduct)

        }catch(err){
            throw new Error(err)

        }   }
)

// get one Product

const getOneProduct = asyncHandler(
    async(req,res)=>{
        try {
            const product_id = req.params
        valideMongodbId(product_id.id) 

    const findProduct = await Product.findById(product_id.id )
        res.json(findProduct)
            
        } catch (error) {
            throw new Error(error)

            
        }

    }
)

const getAllProducts = asyncHandler(
    async (req,res)=>{
        try {
            const allProduct = await Product.find()
            res.json(allProduct)
            
        } catch (error) {
            throw new Error(error)
            
        }
    }
)


module.exports={createProduct,getOneProduct,getAllProducts}