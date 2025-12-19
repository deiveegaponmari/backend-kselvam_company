const UserModel=require('../models/UserModel')
const jwt=require("jsonwebtoken")
const bcrypt=require('bcryptjs')
require("dotenv").config();

//Register
const RegisterUser = async (req, res) => {
  try {
    const { userName, email, password ,role} = req.body;
    const existingUser =await UserModel.findOne({ email });
   // console.log("existing user",existingUser);
    if (existingUser) {
      return res.status(400).json({ message: "User Already Exists" });
    }
    const CreateUser = await UserModel.create({ userName, email, password ,role});
    return res.status(201).json({
      user: CreateUser,
      message: "User Registration Successfull!!!!",
    });
  } catch (error) {
    console.log("Registration Error:", error);
    return res.status(500).json({ error: "Server Error" });
  }
};

//login the user
const LoginUser=async (req,res)=>{
    try{
        const{email,password}=req.body;
        const user=await UserModel.findOne({email});
       // console.log("user is",user)
       //user not found
       if(!user){
        return res.status(404).json({message:"User Not Found"})
       }
       //password check
       const matchPassword=await bcrypt.compare(password,user.password)
       if(!matchPassword){
        return res.status(400).json({message:"Password InCorrect"})
       }

       //Generate Token
        const generateToken=jwt.sign(
            {id:user._id,role:user.role},
            process.env.JWT_SECRET,
           { expiresIn:process.env.JWT_EXPIRES_IN}
        )
        return res.status(200).json({
            token:generateToken,
            message:"Login successfull!!!!"})

    }
    catch(error){
        return res.status(500).json({message:"Something went wrong"})
    }
}
module.exports ={
RegisterUser,
LoginUser
}
