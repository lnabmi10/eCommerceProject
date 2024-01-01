const Product = require('../models/productModel')
const asyncHandler = require('express-async-handler')
const valideMongodbId = require('../utils/validateMongodbId')
const slugify = require('slugify')
const { json } = require('body-parser')



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

            // filtring by price
            const queryObj = {...req.query}
            console.log("queryobj befor exclude",queryObj)
            excludeFields = ["page","limit","sort","fields"]
            excludeFields.forEach((el) => delete queryObj[el]);
            console.log("queryobj",queryObj) 
            let queryStr = JSON.stringify(queryObj);
            console.log("queryStr",queryStr)
            queryStr = queryStr.replace(/\b(gte|lt|gt|lte)\b/g,match =>`$${match}`)
            // if queryStr = {} fin(queryStr will get all the data in product collection)

            // getting the data

            let queryProduct = Product.find(JSON.parse(queryStr)) 

            // sorting 
            if(req.query.sort){
                const sortBy = req.query.sort.split(',').join(' ');
                console.log(sortBy)
                queryProduct = queryProduct.sort(sortBy)
             
            }else{
                queryProduct = queryProduct.sort("-createdAt")

            }

            // limiting the fields 
            if(req.query.fields){
                const fields = req.query.fields.split(',').join(' ');
                queryProduct = queryProduct.select(fields)

            }
            else{
                queryProduct = queryProduct.select('-__v')

            }

            //pagination 
            if(req.query.limit){
            const page = req.query.page
            const limit = req.query.limit
            const skip =  (page-1)*limit
            console.log(page,limit,skip)
            if(req.query.page){
                const countProduct= await Product.countDocuments()
                if(skip>countProduct)throw new Error("this page is emty ")
            }
            queryProduct = queryProduct.skip(skip).limit(limit)

            }





           // const allProduct = await Product.where("category").equals(req.query.category)
           const ProductFilterByPrice = await queryProduct

            res.json(ProductFilterByPrice)
            
        } catch (error) {
            throw new Error(error)
            
        }
    }
)


module.exports={createProduct,getOneProduct,getAllProducts,updateProduct,deleteProduct,}