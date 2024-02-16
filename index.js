const express = require("express");
const dbConnect = require("./config/dbConnect");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 4000 ;
const authRouter = require('./routes/authRoute');
const productRouter = require('./routes/productRoute');
const blogRouter = require('./routes/blogRoute');
const blogCategoryRouter = require('./routes/blogCategoryRoute');
const categoryRouter = require('./routes/categoryRoute')
const brandRouter = require('./routes/brandRoute')
const couponRouter = require('./routes/couponRoute')
const { errorHandler, notFound } = require("./middlewares/errorHandler");
const cookieParser = require('cookie-parser');
const morgan = require('morgan')

app.use(morgan("dev"))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dbConnect();
app.use(cookieParser())

app.use('/api/user',authRouter)
app.use('/api/product',productRouter)
app.use('/api/blog/',blogRouter)
app.use('/api/category/',categoryRouter)
app.use('/api/blogcategory/',blogCategoryRouter)
app.use('/api/brand/',brandRouter)
app.use('/api/coupon/',couponRouter)

app.use(errorHandler)
app.use(notFound)


app.use('/', (req,res)=>{
    res.send("hello from server side");
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  