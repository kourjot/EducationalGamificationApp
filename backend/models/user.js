import {Schema,model} from "mongoose"
const userSchema=new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    profileImage:{type:String,default:""}
})
const User =model("User",userSchema)
export {User}