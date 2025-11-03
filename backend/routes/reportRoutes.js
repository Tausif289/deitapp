import express from "express";
import { getUserReport } from "../controller/reportController.js";
const router = express.Router();

router.get("/:userId", getUserReport);

export default router;
