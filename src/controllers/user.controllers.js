import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";

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

  const {username, email, fullName, password}  = req.body
  console.log("email", email);

  if (fullName === "") {
    throw new ApiError(400, "fullName is required")
  }
})

export  {registerUser};