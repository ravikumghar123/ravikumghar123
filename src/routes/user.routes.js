import { Router } from "express";
import { registerUser } from "../controllers/user.controllers";
import {upload} from "../middlewares/multer.middlewares.js";

const router = Router();

router.route("/w4").post(
    upload.fields([
     {
        name: "avater",
        maxcount: 1
     },
     {
        name: "coverImage",
        maxcount: 1
     }
    ]),
    registerUser);

//router.route("/login").post(login);

export default router;
