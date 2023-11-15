//Here we Create Router (to guide to a destination) for files...

const express=require('express')
const User=require('../Model/userModel')  //imported user Model..
const router=express.Router()             //express gives us method called Router..
const Joi=require('joi')                  //It is imported to setup validation for schema..
const bcrypt=require('bcryptjs')    //It is to pass hashed password created to validation...
const auth=require('../middleware/auth')//It is to get user details after Authorization...


//Its [Sign up] Route.It will Save the data (Post or update) to the Db 
//This req is the passing of a data from FE(Here Postman)
//SIGN UP ROUTE......
router.post('/users/signup',async(req,res)=>{
//Here joi schema is created according to joi docs(general usage page)
    const schema = Joi.object({
        name: Joi.string(),
        age:Joi.number(),
        email:Joi.string(),
        password:Joi.string() //If needed we can have conditions //.pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    });
        // Here it is validated //req.body is the data that is passed from FE(Here from Body of postman)
    const {error}=schema.validate(req.body)
    if(error) return res.send({message:error.details[0].message})
    
    //Here we are Checking Duplication or not of same user... 
                             //optional Chaining is done to avoid breaking code..(if no value)
    let user=await User.findOne({email:req?.body?.email})
    if(user) return res.send({message:"User Already Exists"})

    //It is to hashing of the password:
    const salt =await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(req.body.password,salt)
 
    //Here we accept the details from user FE(Here from body of Postman)
    user=new User({
        name:req.body.name,
        age:req.body.age,
        email:req.body.email,
        //password acceptance is declared in Duplication code..
        password:hashedPassword
    })
//It will handle error with out breaking page...
    try{
        //Saving data to Db
        await user.save()
    // Here we call function created in userModel to generate token..     
        const token=await user.generateAuthToken()
    //This is to send data and token to Browser taken in object(But here we can see in Postman)
                    //This will show extra token in postman       
        res.send({user,token})
       
    }catch(e){res.send({message:e})}
})

//SignIN Route that check name and password match to login...
router.post('/users/signin',async(req,res)=>{
    const schema = Joi.object({
        email:Joi.string(),
        password:Joi.string()
    });
    const {error}=schema.validate(req.body)
    if(error) return res.send({message:error.details[0].message})

//Here By geting email..we check wheather such user is there..
    let user=await User.findOne({email:req?.body?.email})
    if(!user) return res.send({message:"User Not Found"})

//Here we compare the password match to the created password at SIGN UP...
    // const isValidPassword=await bcrypt.compare(req?.body?.password,user.password)
    // console.log(req.body.password,user.password)
    // console.log(isValidPassword)
    // if(!isValidPassword) return res.send({message:"Password Didnt Matched"})

    try{
//We have to create token here also to get autharization for different purposes
         const token=await user.generateAuthToken() 
         // console.log(token)
        res.send({user,token})
    }catch(e){res.send({message:e})}

})

//Here we Create Route a single person to get Authorized....
router.get('/users/me',auth,async(req,res)=>{
    // find...is a Database commands used.....
    try{
        // const getAllUsers=await User.find({})//ModelName.MethodName()
            //Here the details are taken from middleware file of a perticular person.
        res.send(req.user)
    }catch(e){res.send({message:e})}
})


// //It is to get Details of unique item By taking Id from url that has given..
//                 //id passed as dynamically..(Because any id can come according to click in FE)
// router.get('/users/:id',async(req,res)=>{
//     // FROM DB
//     // Find
//     //res.send(req.params.id)
//     try{
//         const getAllUsers=await User.findById(req.params.id)//ModelName.MethodName()
//         if(!getAllUsers){
//             res.send({message:"User Not Found"})
//         }       
//         res.send(getAllUsers)
//     }catch(e){res.send({message:e})}
// })


//It is to Update a perticular item by fetching By Id and Patching it.....
//update the users|| PUT/PATCH Method
//Route is modified and auth is put inbetween to get id for updation...
router.patch('/users/me',auth,async(req,res)=>{
    //res.send(req.params.id) 
    try{
                                                    //1st it take where to get update by taking id from auth file..
                                                                    //2nd it take data what to be updated from body
                                                                            //3rd it take to update it in one click request..(else default we need to give 2 click)
        const updateUsers=await User.findByIdAndUpdate(req.user._id,req.body,{new:true,runValidators:true})//ModelName.MethodName()
        
        res.send(updateUsers)
    }catch(e){res.send({message:e})}
})


//It will delete the data according to Id given in url...
router.delete('/users/me',auth,async(req,res)=>{
    //res.send(req.params.id)
    try{
        const DeleteUsers=await User.findByIdAndDelete(req.user._id)//ModelName.MethodName()       
        res.send(DeleteUsers)
    }catch(e){res.send({message:e})}
})

module.exports=router //exporting the router