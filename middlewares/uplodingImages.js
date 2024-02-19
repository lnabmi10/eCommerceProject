const multer = require('multer')
const sharp = require('sharp')
const path = require('path')


const multerStorage =  multer.diskStorage({
    destination : function (re,file,cb){
        cb(null,path.join(__dirname,"../publics/images"))

    } ,
    filename : function(req,file,cb){
        const uniqueSuffix =Date.now() +"-" +Math.round(Math.random() * 1e9)

        cb(null,file.filename+uniqueSuffix+".jpeg")

    }
})

const multerFilter = (req,file,cb)=>{
    if (file.mimetype.startswith('image') ){
        cb(null,true)
    }else{
        cb({
            message : "unsupported file format"
        },true)
    }
}

const uploadImg = multer({
    storage : multerStorage,
    fileFilter : multerFilter,
    limits : {fileSize:2000000}

})

const productImgResize = async (req, res, next) => {
    if (!req.files) return next();

    for (const file of req.files) {
        try {
            await sharp(file.buffer)
                .resize(300, 300)
                .toFormat('jpeg')
                .jpeg({ quality: 90 })
                .toFile(`public/images/product/${file.filename}`);
        } catch (error) {
            throw new Error(`Error processing image ${file.filename}: ${error.message}`);
        }
    }

    next();
};
const blogsImgResize = async (req, res, next) => {
    if (!req.files) return next();

    for (const file of req.files) {
        try {
            await sharp(file.buffer)
                .resize(300, 300)
                .toFormat('jpeg')
                .jpeg({ quality: 90 })
                .toFile(`public/images/blogs/${file.filename}`);
        } catch (error) {
            throw new Error(`Error processing image ${file.filename}: ${error.message}`);
        }
    }

    next();
};
const usersImgResize = async (req, res, next) => {
    if (!req.files) return next();

    for (const file of req.files) {
        try {
            await sharp(file.buffer)
                .resize(300, 300)
                .toFormat('jpeg')
                .jpeg({ quality: 90 })
                .toFile(`public/images/users/${file.filename}`);
        } catch (error) {
            throw new Error(`Error processing image ${file.filename}: ${error.message}`);
        }
    }

    next();
};
module.exports={uploadImg,productImgResize,blogsImgResize,usersImgResize}