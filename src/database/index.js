import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
//import { connectDB } from "./database/index.js"

const connect = async()=>{
    try{
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    }catch(error){
        console.log("MONG)DB connection error ", error);
        process.env(1)
    }
}
const connectDB = require('./database/index.js');

export const connectDB = () =>{
 
};
//export { connectDB};