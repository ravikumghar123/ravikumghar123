require('dotenv').config({path: './env'});
import dotenv from "dotenv";
import connectDB from "./database/index.js";
import { connectDB } from "./database/index.js";

dotenv.config({
    path: './env'
});

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`server is running at port : ${process.env.PORT}`);
    });
});
    try{
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`,{
        useNewUrlParser: true,
        userUnifiedTopology: true,
    });
  console.log("MonogoDB connection successful");
  const PORT = process.env.PORT || 8000;
    app.listen(PORT, () =>{
        console.log(`App is listening on port ${PORT}`);
    });
    }
 catch(err) {
    console.log("MONGO db connection failed !!! ", err);
}

/*import express from "express";
const app = express();

(async()=>{
    try{
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    app.on("error", (error) =>{
        console.log("Error: ", error);
        throw error
    })

    app.listen(process.env.PORT, () =>{
        console.log(`App is listening on port ${process.env.PORT}`);
    })
    }
    catch(error){
        console.error("ERRORzz: ", error)
        throw err
    }
})()*/

