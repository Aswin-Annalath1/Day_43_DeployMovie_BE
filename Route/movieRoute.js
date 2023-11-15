const express=require('express')
const Movie=require('../Model/movieModel')
const router=express.Router()


// Adding Movie to Db....(This is Normal type...)

router.post('/movies',async(req,res)=>{  
    console.log(req.user)  
   const newMovie=new Movie(req.body)
    try{
        await newMovie.save()
        res.send(newMovie)
    }catch(e){res.send({message:e})}
})

// Get All Movies of all the users...
router.get('/movies',async(req,res)=>{
    try{
      const getAllMovies=await Movie.find({})//ModelName.MethodName()
      res.send(getAllMovies)
  }catch(e){res.send({message:e})}
})

// Get Movie by Id of  the users...
router.get('/movies/:id',async(req,res)=>{
    console.log(req.params.id)
    try{
      const getAllMovies=await Movie.findById(req.params.id)//ModelName.MethodName()
      res.send(getAllMovies)
  }catch(e){res.send({message:e})}
})

//Updating Movies by Id of the user...
router.patch('/movies/:id',async(req,res)=>{
    // FROM DB
    // Find
    //res.send(req.params.id)
    try{
        const updateMovie=await Movie.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})//ModelName.MethodName()       
        res.send(updateMovie)
    }catch(e){res.send({message:e})}
})

//Deleting Movies by Id of the user...
router.delete('/movies/:id',async(req,res)=>{
    // FROM DB
    // Find
    //res.send(req.params.id)
    try{
        const DeleteMovie=await Movie.findByIdAndDelete(req.params.id)//ModelName.MethodName()       
        res.send(DeleteMovie)
    }catch(e){res.send({message:e})}
})



module.exports=router