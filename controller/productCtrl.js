const Product = require('../models/productModel')
const asyncHandler = require('express-async-handler')
const valideMongodbId = require('../utils/validateMongodbId')
const slugify = require('slugify')
const { json } = require('body-parser')
const User = require('../models/userModel')
const coudinaryUploadImg = require('../utils/cloudinary')
const fs = require('fs')



// create Product 
const createProduct =  asyncHandler(
    async (req,res)=>{

        const {shopid} = req.params
        try{
            if(req.body.title){
                req.body.slug=slugify(req.body.title)
            }
            const newProduct = await Product.create({
            title : req?.body.title,
            slug: req.body.slug,
            description : req?.body.description,
            price : req?.body.price,
            category : req?.body.category,
            brand  : req?.body.brand,
            quantity: req?.body.quantity,
            sold :  req?.body.sold,
            color :  req?.body.color,
            shop : shopid,
            })
            res.json(newProduct)

        }catch(err){
            throw new Error(err)

        }   }
)
// update Product

const updateProduct = asyncHandler(async(req,res)=>{
 
    const {id} = req.body;
   // valideMongodbId(id);
   
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

const addToWishList = asyncHandler(async(req,res)=>{
    const {_id} = req.user

    const {prodId} = req.body

    try {
        const currentUser = await User.findById(_id)

        let alreadyAded = currentUser.wishlist.find(  (id)=>id.toString() === prodId )


        if(alreadyAded){
            let user = await User.findByIdAndUpdate(_id,
                {$pull : { wishlist : prodId}},
                {new : true} )
            res.json(user)
        }else{
            let user = await User.findByIdAndUpdate(_id,
                {$push : { wishlist : prodId}},
                {new : true} )
            res.json(user)

        }

        
    } catch (error) {
        throw new Error(error)
    }
})
const ratingProduct = asyncHandler(async(req,res)=>{
    const {_id} = req.user
    const {star,comment,prodId}=req.body
    

    try {
        
    const product = await Product.findById(prodId)
    let alreadyRated =  product.ratings.find((userId)=>userId.postedby.toString()===_id.toString())
    console.log(alreadyRated)
        if(alreadyRated){
            const updateRating= await Product.updateOne({
                ratings : {$elemMatch : alreadyRated}
            },
            {$set : { "ratings.$.star" : star ,"ratings.$.comment" : comment}},
            { new : true}
            )
        }else{
            let ratedProduct = await Product.findByIdAndUpdate(prodId,
                { $push :{
                    ratings:{
                        star : star,
                        comment : comment,
                        postedby : _id,
                            }}
                },
                {new:true})

        }
        // all rating product
    const allProductRatings  = await Product.findById(prodId)
    let totalrating = allProductRatings.ratings.length
    let sumrating = allProductRatings.ratings.map((item=>item.star)).reduce((a,b) => a+b ,0)
    let avgRating = sumrating/totalrating;
    let roundedAvg = Math.round(avgRating*10)/10 ;

    let finalProduct = await Product.findByIdAndUpdate(prodId,
        {totalrating:roundedAvg},
        {new:true})

    res.json(finalProduct)



    } catch (error) {
        throw new Error(error)
    
    }})

    const uploadProductImages = asyncHandler(async (req,res)=>{
        const {id} = req.params
        valideMongodbId(id)
        try {
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
            const updateProduct = await Product.findByIdAndUpdate(id,
                {
                images : urls.map( (file)=>{
                    return file;
                })
            },{new:true})

            res.json(updateProduct)


        } catch (error) {
            throw new Error(error)
            
        }

    })



module.exports={createProduct,getOneProduct,getAllProducts,updateProduct,deleteProduct,addToWishList,ratingProduct,uploadProductImages}