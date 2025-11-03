import mongoose from "mongoose";

/* ------------------ Goal Schema ------------------ */
const goalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    enum: ["Weight", "Calories", "Distance", "Duration"],
    required: true,
  },
  initialValue: {
    type: Number,
    required: true,
    default: 0,
  },
  currentValue: {
    type: Number,
    required: true,
    default: 0,
  },
  targetValue: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    trim: true,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

/* Automatically update `updatedAt` on any modification */
goalSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

/* ------------------ Weekly Weight Schema ------------------ */
const weeklyWeightSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
    min: 0,
  },
});

/* ------------------ Main User Goal Tracking Schema ------------------ */
const goalTrackingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  goals: [goalSchema],
  weeklyWeights: [weeklyWeightSchema],
});

export default mongoose.model("GoalTracking", goalTrackingSchema);
