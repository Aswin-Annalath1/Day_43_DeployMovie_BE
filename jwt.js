//Here we are just creating (JWT) jsonwebToken for the user entered...

const jwt=require('jsonwebtoken')

//Creating a function to test and learn...
const myFunction=async()=>{
                       //This is id taken from user..
                                      //This is secret Key passed, made by us to keep safe..
    const token=jwt.sign({_id:"123456"},'abc')
    console.log("Token is",token)
    //It is to check wheather made Token is valid...
    const data=jwt.verify(token,'abc')
    console.log("data is",data)
    //The output will have (id) and (iat) which is the time it has been created.. 
}
myFunction()