const express = require("express");
const dbConnect = require("./config/dbConnect");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 4000 ;
const authRouter = require('./routes/authRoute');
const { errorHandler, notFound } = require("./middlewares/errorHandler");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dbConnect();

app.use('/api/user',authRouter)
app.use(errorHandler)
app.use(notFound)


app.use('/', (req,res)=>{
    res.send("hello from server side");
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  