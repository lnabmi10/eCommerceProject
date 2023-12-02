const User = require('../models/userModel')


const createUser = async (req,res)=>{
    const email = req.body.email;
    const findUser = await User.findOne({email:email});
    if (!findUser ){
        // create user 
        const newUser = new User(req.body) ;
        newUser.save();

        res.json(newUser);
    }else{
        res.json({msg : "user aleady exist",
                  success : false
                })
    }
}
