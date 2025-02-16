import {v2} from "cloudinary";
import { response } from "express";
import fs from "fs";

cloudinary.config({
cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
api_key: process.env.CLOUDINARY_API_KEY,
api_secert: process.env.CLOUDINARY_CLOUD_SECERT
});

const uploadCloudinary = async (localFilePath) =>{
    try{
        if(!localFilePath) return null
        // upload the file on cloudinary
        const response = await cloudinary.uploder.uplod(localFilePath,{
             response_type: "auto"
        })
        //file has been uploaded successfull
        console.log("file is uploaded on cloudinary", response.url);
        return response;
    }
    catch(error){
     fs.unlinkSync(localFilePath)// remove the locally saved temporary file as the upload operation got failed
     return null
    }
} 

export {uploadCloudinary}