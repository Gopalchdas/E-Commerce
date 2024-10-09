import mongoose from "mongoose";
export const dbconnection=()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbname:"Ecommerce"
    }).then(()=>{
        console.log("database is connected");
    }).catch((err)=>{
        console.log(err);
    })
}