const Product = require('../models/productModel')
const asyncHandler = require('express-async-handler')
const valideMongodbId = require('../utils/validateMongodbId')
const slugify = require('slugify')



// create Product 
const createProduct =  asyncHandler(
    async (req,res)=>{

        try{
            if(req.body.title){
                req.body.slug=slugify(req.body.title)
            }
            const newProduct = await Product.create(req.body)
            res.json(newProduct)

        }catch(err){
            throw new Error(err)

        }   }
)
// update Product

const updateProduct = asyncHandler(async(req,res)=>{
    console.log(req.body)
    const {id} = req.body;
   // valideMongodbId(id);
   console.log(id)
    try {
        if(req.body.title){
            req.body.slug = slugify(req.body.title) 
        }

        const  theUpdatedProduct = await Product.findByIdAndUpdate(id,{
            
            title : req?.body.title,
            slug: req.body.slug,
            description : req?.body.description,
            price : req?.body.price,
            category : req?.body.category,
            brand  : req?.body.brand,
            quantity: req?.body.quantity,
            sold :  req?.body.sold,
            color :  req?.body.color,
        },{
            new : true
        })
        res.json(theUpdatedProduct)
       
        
    } catch (error) {
        throw new Error(error)
        
    }
}

)
// delete Product 
const deleteProduct = asyncHandler(async(req,res)=>{
    const {id} = req.params
    console.log(id)
    try {
    const deletedProduct = await Product.findByIdAndDelete(id)
        res.json(deletedProduct)
    } catch (error) {
        throw new Error(error)
        
    }
} 

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


module.exports={createProduct,getOneProduct,getAllProducts,updateProduct,deleteProduct,}