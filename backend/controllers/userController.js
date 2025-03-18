import {User} from "../models/user.js"
import argon2 from "argon2"
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
export {registerUser}