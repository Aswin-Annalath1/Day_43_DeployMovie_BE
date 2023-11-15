//Here we create a seperate userModel file..


const mongoose=require('mongoose')

const validator = require('validator');

const jwt=require('jsonwebtoken')

// Here We Define a model/Schema (specify how data should be)
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        lowercase:true
    },
    age:{
        type:Number,
        default:16,
        validate(value){
            if(value<15) throw new Error("Age must be greater than 15")
        }
    },
    email:{
        type:String,
        lowercase:true,
        minlength:12,
        required:true,
    //It is a function which take value & check. (install Validator in main file (npm i validator))
        validate(value){
    //we have to require Validator on top (Read Docs carefully & Do) 
            if(!validator.isEmail(value)) throw new Error("Email Not Valid")
        }
    },
    password:{
        type:String,
        lowercase:true,
        minlength:8,
        required:true,
        validate(value){
            if(value.includes("password")) throw new Error("Password should not contain password")
        }
    },
    //Here we are creating the schema to save tokens...
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
})

//Here we Create function for generating tokens using (methods=>which are accessible instances)
                   //It is user defined name(generateAuthToken)
userSchema.methods.generateAuthToken=async function(req,res,next){
    //When we use (this),all things in user will come to (this)
    const user=this
    //generate a token taking (_id) from user and pass a //secret key
    const token=jwt.sign({_id:user._id.toString()},'thisismycourse')
    //Here we concatinate the created token to the above defined model (user.tokens)     
    user.tokens= user.tokens.concat({token:token})
    console.log(token)
    await user.save()
    //We have to return it to get it with the user datas..
    return token;
}

//Here we create a virtual relation between task and user Model...(not stored in DB)
                //This is user defined name..
userSchema.virtual('taskRel',{
    ref:'Task'         , //Task Model is refered here...
    localField:'_id',    //user id is given here/ object id of perticular user got here,
    foreignField:'owner' //owner id from task Model is taken here...
})

const User=mongoose.model('User',userSchema)

module.exports=User