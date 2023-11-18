//Here we Run server and And get data From FE(use Postman) and Post it to Db From BE...

//Importing .env file 
const dotenv=require('dotenv')
dotenv.config()
//Importing Connection ...from Db file
const connection=require('./Db/connection')
connection()

// Importing Models that stored seperately
const User=require('./Model/userModel')
const Task=require('./Model/taskModel')

const userRouter=require('./Route/userRouter')  //importing from userRouter..
const taskRouter=require('./Route/taskRoute')   //importing from taskRouter..
const movieRouter=require('./Route/movieRoute')  //importing from movieRouter..

// Importing express
const express=require('express')
const app=express()      // express Function stored to a variable

//Importing cors to avoid errors...
const cors=require('cors')

//Port initialized and started from .env file..
                    //Take default port or 8000(during deployment)
const PORT=process.env.PORT || 8000

//It will convert and give us the data(It is a middleware function)
app.use(express.json())
//It is avoid error when connecting FE and checking..
app.use(cors())
//It will use the files routed in userRouter...
app.use(userRouter)
app.use(taskRouter)
app.use(movieRouter)



// Listen to PORT
app.listen(PORT,()=>{
    console.log("Server Started at PORT no:",PORT)
})
