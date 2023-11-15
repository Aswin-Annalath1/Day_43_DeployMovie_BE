// Here We are just Learning How Hatching/Hashing password..to get Protected..

//Installing And importing bcryptjs...from npm package
const bcrypt=require('bcryptjs')
console.log("1")

//Creating a function to Hash password
const myFunction=async()=>{
//Here Normal password Entered
   const password="Red12345!" 

//Salt will enhance security again after Hashing done..
   const salt =await bcrypt.genSalt(10)// 10 is number of round salt algorithm should run..
// Here the passWord is Hashed and the number (8) is number of times the Hashing algorithm should run to generate random string..   
   const hashedPassword=await bcrypt.hash(password,8)

//The Password after Both Hashing and Salt which will provide High Protection..   
   const hashedSaltPassword=await bcrypt.hash(password,salt)
   console.log(password)
   console.log(hashedPassword)
   console.log(hashedSaltPassword)
//Its to check wheather both password after haching are Same.. 
   const isMatch=await bcrypt.compare(password,hashedPassword)
   console.log(isMatch)
}
myFunction() 