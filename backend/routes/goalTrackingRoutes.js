
import express from "express";
import {
  getGoalTracking,
  addGoal,
  updateGoal,
  removeGoal,
  addWeightEntry,
  updateWeightEntry,
  removeWeightEntry,
} from "../controller/goalTrackingController.js";

const router = express.Router();

/* ------------------ GOALS ------------------ */
router.get("/:userId", getGoalTracking);
router.post("/add-goal", addGoal);
router.put("/:userId/goals/:goalId", updateGoal);
router.delete("/:userId/goals/:goalId", removeGoal);

/* ------------------ WEIGHT ENTRIES ------------------ */
router.post("/add-weight", addWeightEntry);
router.put("/:userId/weights/:entryId", updateWeightEntry);
router.delete("/:userId/weights/:entryId", removeWeightEntry);

export default router;

