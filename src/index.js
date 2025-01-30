import dotenv from "dotenv";
import connectDB from "./database/index.js";

dotenv.config({
    path: './.env'
});
/*const mongoose = require('mongoose');
require('dotenv').config();*/

/*(async () => {
    try{
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGODB_URI}/${process.env.DB_NAME}`,
            {
                userNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
        console.log("MongoDB connected successfully");
    }catch(err){
        console.log("MongoDB connection failed", err);
    }
});*/

connectDB().then(()=>{
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`server is running at port : ${process.env.PORT}`);
    });
}),

( async ()=>{
    try{
    await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
}catch(err) {
    console.log("MONGO db connection failed !!! ", err);
}
});

/*import express from "express";
const app = express();

(async()=>{
    try{
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    app.on("error", (error) =>{
        console.log("Error: ", error);
        throw error
    })
T
    app.listen(process.env.POR, () =>{
        console.log(`App is listening on port ${process.env.PORT}`);
    })
    }
    catch(error){
        console.error("ERROR: ", error)
        throw err
    }
})*/