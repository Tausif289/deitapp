import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../model/user.js";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";
const storage = multer.memoryStorage();
export const upload = multer({ storage });
// ✅ Register a new user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, currentWeight, targetWeight, age, height } = req.body;
    console.log(req.body)
   // console.log(req.body)
    // check if user exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
   

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword)
    // create new user
    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
      currentWeight,
      targetWeight,
      age,
      height,
    });
     const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "7d" }
    );
    console.log(newUser)
    console.log(newUser._id)
    res.status(201).json({
      message: "User registered successfully",
      token,
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error: error.message });
  }
};

// ✅ Login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "secretkey", {
      expiresIn: "7d",
    });
    console.log(user)
    res.status(200).json({
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};


export const updateProfile = async (req, res) => {
  try {
    const { userId } = req.params; 
    const { name, age, height, currentWeight, targetWeight } = req.body;

    const updateData = { name, age, height, currentWeight, targetWeight };

    // If image file is uploaded
    if (req.file) {
      await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "user_profiles" },
          async (error, result) => {
            if (error) return reject(error);
            updateData.photoURL = result.secure_url;
            resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });
    }

    const updatedUser = await userModel.findByIdAndUpdate(userId, updateData, { new: true });
    if (!updatedUser) return res.status(404).json({ message: "User not found" });

res.status(200).json({ 
  success: true,
  message: "Profile updated successfully", 
  user: updatedUser 
});
  console.log(updatedUser)
  } catch (error) {
    res.status(500).json({ message: "Error updating profile", error: error.message });
  }
};