import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {User, user} from "../models/user.model.js";
import {uploadCloudinary} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/Apiresponse.js";

const registerUser = asyncHandler( async(req, res) => {
     /*Register setps
     1 get user details from frontend
     2 validation - not empty
     3 check user already exists: username, email
     4 check for images, check for avater
     5 upload them cloudinary, avater
     6 create user object - create entry in db
     7 remove password and refresh token filed from response
     8 check for user creation
     9 return res*/

    /*res.status(200).json({
        message: "ok"
    })*/
// user details
  const {username, email, fullName, password}  = req.body
  console.log("email:", email);

  if (fullName === "") {
    throw new ApiError(400, "fullName is required")
  }

// check user validation
 if(
   [fullName, email, username, password].some((field)=> field?.trim() === "")
 ){
   throw new ApiError(400, "All fields are required")
 }
// check user username or email
 const existedUser = await User.findOne({
  $or: [{username},  {email}]
 })

 if(existedUser){
  throw new ApiError(409, "Use with email or username already existed")
 }

 // check images or avatar
 const avatarLocalPath = req.files?.avatar[0]?.path;
 const coverImageLocalPath = req.files?.coverImage[0]?.path;
  
 if(!avatarLocalPath){
  throw new ApiError(400, "Avatar file is required")
 }

 // upload file in cloudinary
 const avatar = await uploadCloudinary(avatarLocalPath);
 const coverImage = await uploadCloudinary(coverImageLocalPath);
  
 if(!avatar){
  throw new ApiError(400, "Avatar file is required")
 }
 // create object or enter the database
 const user = 
 await User.create({
  fullName,
  avatar: avatar.url,
  coverImage: coverImage?.url || "",
  email,
  password,
  username: username.toLowerCase()
 }) 
 // remove password -or reshToken 

 const createUser = await user.findById(user._id).select(
  "-password -reshToken"
 )
 //check for user creation

 if(!createUser){
  throw new ApiError(500, "Something went wrrong while registering the user")
 }
// return res
  return res.status(201).json(
   new ApiResponse(200, createUser, "User registered successfully")
  )
})

export  {registerUser};