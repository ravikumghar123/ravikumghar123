import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {User, user} from "../models/user.model.js";
import {uploadCloudinary} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/Apiresponse.js";

const generateAccessTokenAndRefereshTokens = async(userId) =>{
  try{
    const user = await User.findById(userId)
    const accessToken = user.generateAccessToken()
    const refereshToken = user.generateRefreshToken()
     
    user.refereshToken = refereshToken
    await user.save({validateBeforeSave: false})

    return{accessToken, refereshToken}
   
  }catch(error){
    throw new ApiError(500, "Something went wrong while generating referesh and access token")
  }
}

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

const loginUser = asyncHandler(async(req, res)=>{
     // req body -> data 
    // username or email
    //find the user
    //password check
    //access and referesh token
    // send the token cookies

    const {email, username, password} = req.body

    if(!username  || !email){
      throw new ApiError(400, "username or password is required")
    }

    const user = await User.findOne({
      $or: [{username}, {email}]
    })
    if(!user){
      throw new ApiError(404, "User does not exist")
    }
    const isPasswordCorrectValid = await user.isPasswordCorrect(password)
    if(!isPasswordCorrectValid){
      throw new ApiError(401, "Password is incorrect")
    }
    // access and refresh token
  const {accessToken, refereshToken} = await generateAccessTokenAndRefereshTokens(user._id)

  //send  the cookie
  const loggedInUser = User.findById(user._id).select("-password, -refreshToken")

  const options = {
    httpOnly: true,
    secure: true
  }

  return res
  .status(200)
  .cookie("accessToken", accessToken, options)
  .cookie("resfreshToken",refereshToken, options)
  .json(
    new ApiResponse(
      200,
      {
        user: loggedInUser, accessToken, refereshToken
      },
      "User logged in Successfully"
    )
  )
  })

  // logout User 
  /* 1 coikies is clear
     2 referesh token and access token clear*/
  const logoutUser = asyncHandler(async (req, res) => {
     
  })

export  {registerUser, loginUser};