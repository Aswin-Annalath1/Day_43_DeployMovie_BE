const express=require('express')
const User=require('../Model/userModel')
const Task=require('../Model/taskModel')
const router=express.Router()
const Joi=require('joi')
const bcrypt=require('bcryptjs')
const auth=require('../middleware/auth')

// Adding Task ....(This is Normal type...)

// router.post('/task',async(req,res)=>{  
//     console.log(req.user)  
//    const taskData=new Task(req.body)
//     try{
//         await taskData.save()
//         res.send(taskData)
//     }catch(e){res.send({message:e})}
// })

// add ||edit-update ||delete  can be done using  // req.params.id

//Here we are creating user=>login=> and tasks are created with his IDs....
//Add Task is Done..
router.post('/task',auth,async(req,res)=>{  
    console.log(req.user)  
   const taskData=new Task({
    ...req.body,       //We create a copy of it...(datas from body of postman)
    owner:req.user._id  //here we get id from auth file created after Autharization..
   })
    try{
        await taskData.save()  //Here Data saved to Db
        res.send(taskData)     //Data is send to browser(here postman..)
    }catch(e){res.send({message:e})}
})

//Here we Get All Task of all the users
router.get('/task',async(req,res)=>{
    // FROM DB
    // Find
    try{
        const getAllTask=await Task.find({})//ModelName.MethodName()
        res.send(getAllTask)
    }catch(e){res.send({message:e})}
})

//Now we need to create get task=> only that particluar user task should reflect
// Get All Task of specifc users
router.get('/usertask',auth,async(req,res)=>{
    // FROM DB
    // Find
    try{
        //Here from population (virtual schema made in userModel-taskRel) the specific person task are taken
        await req.user.populate('taskRel')
        res.send(req.user.taskRel)
    }catch(e){res.send({message:e})}
})

//Here we have to find the one record of that id of that perticular user (we Bind id with specific user)
router.get('/task/:id',auth,async(req,res)=>{
    // FROM DB
    // Find
    //res.send(req.params.id)
    try{
                                       //we take id from url passed //Then we take owner id from auth file..  
        const getTask=await Task.findOne({_id:req.params.id,owner:req.user._id})//ModelName.MethodName()
        if(!getTask){
            res.send({message:"Task Not Found"})
        }       
        res.send(getTask)
    }catch(e){res.send({message:e})}
})

//Here we will update based on Id of Task of a specific user
//update the users|| PUT/PATCH Method
router.patch('/task/:id',auth,async(req,res)=>{
    // FROM DB
    // Find
    //res.send(req.params.id)
    try{
                                                    //1st parameter will take id of task from url and owner id from auth file..(middleware)
                                                                                          // 2nd parameter is what you have to update
                                                                                                     //3rd is to update it on one click..
        const updateTask=await Task.findOneAndUpdate({_id:req.params.id,owner:req.user._id},req.body,{new:true,runValidators:true})//ModelName.MethodName()       
        res.send(updateTask)
    }catch(e){res.send({message:e})}
})

//Here we will delete based on Id of Task of a specific user
//delete the users
                        //middleware passed in between(which authenticate user by token and give owner id)
router.delete('/task/:id',auth,async(req,res)=>{
    // FROM DB
    // Find
    //res.send(req.params.id)
    try{
                                                    //1st will take id from url and 2nd will take id from auth file.
        const DeleteTask=await Task.findOneAndDelete({_id:req.params.id,owner:req.user._id})//ModelName.MethodName()       
        res.send(DeleteTask)
    }catch(e){res.send({message:e})}
})



module.exports=router