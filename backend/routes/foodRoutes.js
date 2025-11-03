import express from "express";
import {
  addFood,
  addActivity,
  getDailyLog,
  getAllLogs,
  addWater

} from "../controller/foodController.js";

const router = express.Router();

router.post("/addFood", addFood);
router.post("/addActivity", addActivity);
router.get("/:userId/:date", getDailyLog);
router.get("/:userId", getAllLogs);
router.post("/addWater", addWater);

export default router;
