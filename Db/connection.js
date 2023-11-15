// A seperate Db connection file made...

// const mongoose=require('mongoose')
// const validator = require('validator');
// mongoose.connect("mongodb://0.0.0.0:27017/mongoose-route-task02-b51wd",{useNewUrlParser:true})



//Here we import connection url from .env file...
                //async-await will hold connection till it is fully connected...
const mongoose=require('mongoose')
const connection=async()=>{
                              //It is to take from .env file.
        await mongoose.connect(process.env.MONGO_URL,{
        useNewUrlParser:true
    })
    console.log("Mongodb is connected")
    }
    module.exports=connection;



