import mongoose from "mongoose";
const userschema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      currentWeight:{
        type:Number,
        required: true,
      },
      targetWeight:{
        type:Number,
        required: true,
      },
      age:{
        type:Number,
        required: true,
      },
      height:{
        type:Number,
        required: true,
      },
      photoURL: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/512/847/847969.png", // default avatar
      },
    }
  );

const usermodel = mongoose.model.user || mongoose.model("user", userschema);
export default usermodel;