import mongoose from "mongoose";
import validator from "validator";
const messageschema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        validate:[validator.isEmail,"please provide valid email !"]
    },
});
export const Message=mongoose.model("Message",messageschema);
