/**
 * i need to write a logic to register a user
 */
const bcrypt =require("bcryptjs")
const user_model = require("..Models/user.model")
exports.signup = async(req,res)=>{
    /**
     * logic to create the user
     */

    /**
     * 1. read the request body
     */
    const  request_body =req.body
     /**
     * 2. Insert the data in the users collection in Mongodb
      */
     const userObj ={
        name : request_body.name,
        userId : request_body.userId,
        email : request_body.email,
        userType : request_body.userType,
        password : bcrypt.hashSync(request_body.password,8)

     }

     try{
         user_created = await user_model.create(userObj)
    // Return the succesful creation 
         res.status(201).send(user_created)

     }catch(err){
        console.log("Error while registering the user",err)
        res.status(500).send({
            message : "some error happened registering the user  "
        })
     }
     /** 
     * 3. Return the response back to the user 
      */
}