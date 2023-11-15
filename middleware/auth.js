//Here we create MiddleWare and do Authorization by checking passed token with secret key 

//We require jwt for secret key check and User to take details of the user...
const jwt=require('jsonwebtoken')
const User=require('../Model/userModel')

//Authorization function is created
                    //next help to move on to next operation(else the request hitted will go on running without result...)
const auth=async(req,res,next)=>{
    console.log("auth middleware")

//In postman header part Authorization & Bearer token (user token created) is passed...
    const token=req.header('Authorization').replace("Bearer ","")
  
//Then that token is verified with the secret key created in userModel file...
    const decoded=jwt.verify(token,'thisismycourse')
//Here the details of that user is taken using id of that perticular token verified..
    const user=await User.findOne({_id:decoded._id})
//Here token and details of user is assigned to pass it to userRouter file..
    req.token=token,
    req.user=user
//next will take to next operation ...    
    next();
}
module.exports=auth