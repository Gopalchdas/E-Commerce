import bcrypt from "bcrypt";
import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
const userschema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:[3,"First name must contain 3 characters!"]
    },
    lastName:{
        type:String,
        required:true,
        minLength:[3,"Last name must contain 3 characters!"]
    },
    email:{
        type:String,
        required:true,
        validate:[validator.isEmail,"please provide valid email !"]
    },
    password:{
        type:String,
        required:true,
        minLength:[10,"password must contain atleast 10 character"],
        select:false
    },
    role:{
        type:String,
        required:true,
        enum:["Customer","Admin"]
    },
});
userschema.pre("save",async function (next){
    if (!this.isModified("password")) {
        next();
        
    };
    this.password=await bcrypt.hash(this.password,10)
});
//since we store password in hash so we have to make methods to check hash password with entered password
userschema.methods.comparePassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
};
userschema.methods.generatejsonWebToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET_KEY,{expiresIn: process.env.JWT_EXPIRES,});
};
export const User=mongoose.model("User",userschema);   
