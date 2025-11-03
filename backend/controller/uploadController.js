// controller/uploadController.js
import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import usermodel from "../model/user.js";

const storage = multer.memoryStorage();
export const upload = multer({ storage });

export const uploadProfileImage = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    // Upload file buffer to Cloudinary
    const uploadResult = await cloudinary.uploader.upload_stream(
      { folder: "user_profiles" },
      async (error, result) => {
        if (error) return res.status(500).json({ message: "Cloudinary error", error });

        // Save URL to MongoDB
        const updatedUser = await usermodel.findByIdAndUpdate(
          userId,
          { photoURL: result.secure_url },
          { new: true }
        );
        console.log(updatedUser)

        res.status(200).json({
          message: "Profile image updated successfully!",
          user: updatedUser,
        });
      }
    );

    uploadResult.end(req.file.buffer);
  } catch (error) {
    res.status(500).json({ message: "Error uploading image", error });
  }
};
