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


module.exports={uploadImg}