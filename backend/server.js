import express from 'express';
import cors from 'cors'
import connectToDatabase from './config/mongodb.js';
import dotenv from "dotenv";
import userRoutes from "./routes/userRoute.js";
import foodRoutes from "./routes/foodRoutes.js";
import goalTrackingRoutes from "./routes/goalTrackingRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
const port=process.env.PORT||4000;
const app=express()

dotenv.config();
app.use(express.json())
app.use(cors());

//Db connection
connectToDatabase();

// Routes
app.use("/api/users", userRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/goals", goalTrackingRoutes);
app.use("/api/report", reportRoutes); 

app.get("/",(req,res)=>{
    res.send("working")
});

app.listen(port,()=>{
    console.log("server is running on port ",port)
});