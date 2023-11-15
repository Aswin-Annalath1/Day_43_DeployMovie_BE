// Here We Create a seperate taskModel file..

const mongoose=require('mongoose')

// Here We Define a model (specify how data should be)

// const Task = mongoose.model('Task',{
//     description:{
//         type:String,
//         required:true
//     },
//     completed:{
//         type:Boolean,
//         default:false
//     },
// })

// module.exports=Task

//Original Method Of Writing Model (Schema)......  

const schema= new mongoose.Schema({
    description:{
        type:String,
        required:true
    },
    completed:{
        type:Boolean,
        default:false
    },
    //Here we will get the Object Id of user who was authenticated (This is for task creation..)
    //This peice of code will link task to the user(owner)
    owner:{
        type:mongoose.Schema.Types.ObjectId,  //The Types. is written according to type recevied.. 
        required:true,
        ref:'User'//Model Name from where id is exported to here..
    }
    
})
const Task = mongoose.model('Task',schema)

module.exports=Task