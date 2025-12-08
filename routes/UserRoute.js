const express=require('express');
const {RegisterUser,LoginUser}=require("../controllers/UserController")
const UserRouter=express.Router();
UserRouter.post("/register",RegisterUser)
UserRouter.post("/login",LoginUser)
module.exports=UserRouter;