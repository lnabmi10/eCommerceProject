// not found error 

const notFound = (req,res,next)=>{
    const error = new Error(`NOT FOUND : ${req.orginalUrl}`);
    res.status(404);
    next(error);

}
// error handler
const errorHandler = (err,req,res,next)=>{
    const statuscode = res.statusCode == 200 ? 400 : res.statusCode ;
    res.status(statuscode);
    res.json({
        message : err?.message,
        stack : err?.stack,
    }) ;

}

module.exports = {errorHandler,notFound}
