import express from "express";
import { registerUser, loginUser,updateProfile,upload } from "../controller/usercontroller.js";
//import { upload, uploadProfileImage } from "../controller/uploadController.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/update-profile/:userId", upload.single("photo"), updateProfile);
export default router;
