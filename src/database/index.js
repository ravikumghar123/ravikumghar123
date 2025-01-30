import mongoose from "mongoose";
//import { DB_NAME } from "../constants.js";
//import { connectDB } from "./database/index.js"

const connectDB = async()=>{
    try{
    const connectionInstance = await mongoose.
    connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    }catch(error){
        console.log("MONG)DB connection error ", error);
        process.exit(1)
    }
}
//const connectDB = require('./database/index.js');

export default connectDB;