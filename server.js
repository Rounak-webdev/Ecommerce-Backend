// this will be the starting file of the project

const express = require ("express")
const mongoose = require("mongoose")
const app = express ()
const server_config = require ("./config/server.config")
const db_config = require("./config/db.config")
const user_model =require ("./Models/user.model")
const bcrypt = require("bcryptjs")



/**
 * create an admin user at the starting of the application
 */
//connect with mongodb
mongoose.connect(db_config.DB_URL)

const db = mongoose.connection 
db.on("error" ,()=>{
    console.log("error while conneting to the mongodb ")
})

db.once("open" ,()=>{
    console.log("connected to Mongodb")
    init()
})


 async function init (){
    try{
       let  user = await  user_model.findOne( {userId :"admin"})

       if (user){
        console.log("Admin is already present ")
        return 
       }
    }catch(err){
        console.log("Error while reading the data",err)
    }
    try{
        user= await user_model.create({
            name :"Rounak",
            userId :"aadmin",
            email :"rounakrjha09@gmail.com",
            userType : "ADMIN", 
            password :bcrypt.hashSync("Rounakr01##",11)
        })
        console.log("Admin created",user)

    }catch(err){
        console.log("Error while create admin",err)

    }

}



/**
 * calls routes and passing to app object
 */
require("./Router/Auth.route")(app)
/**
 * start the server 
 */
app.listen (server_config.PORT , ()=>{
    console.log("Server Started at port num : ", server_config.PORT)
 })
 