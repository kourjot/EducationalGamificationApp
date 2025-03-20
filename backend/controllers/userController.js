import {User} from "../models/user.js"
import argon2 from "argon2"
import jwt from "jsonwebtoken"
import "dotenv/config"
const registerUser=async(req,res)=>{
    try{
        const {name,email,password}=req.body
        let findUser=await User.findOne({email})
        if(findUser){
            return res.status(400).json({message:"User already exists"})
        }
        const hashedPassword=await argon2.hash(password)
        const newUser=new User({name,email,password:hashedPassword})
        await newUser.save()
        res.json({message:"User registered successfully"})
    }catch(err){
        console.error(err)
        res.status(500).json({message:"Server error"})
    }
}
const login=async(req,res)=>{
    try{
        const {email,password} =req.body
        const findUser=await User.findOne({email})
        console.log(findUser)
        if(!findUser){
            return res.status(400).json({message:"User not found"})
        }
        const valid=await argon2.verify(findUser.password,password)
        if(!valid){
            return res.status(400).json({message:"Invalid credentials"})
        }
        const token=jwt.sign({userId:findUser._id,name:findUser.name,email:findUser.email},process.env.SECRET_KEY)
        
        res.status(200).json({message:"Logged in successfully",token})
    }catch(err){
        console.error(err)
        res.status(500).json({message:"Server error"})
    }
}
export {registerUser,login}