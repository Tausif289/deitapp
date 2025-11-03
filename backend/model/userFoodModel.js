import mongoose from "mongoose";

const mealItemSchema = new mongoose.Schema({
  name: { type: String, required: false },
  calories: { type: Number, required: true },
  protein: { type: Number, default: 0 },
  carbs: { type: Number, default: 0 },
  fat: { type: Number, default: 0 },
});

// 🏃‍♂️ Activity (for burned calories tracking)
const activitySchema = new mongoose.Schema({
  activityName: { type: String, required: true }, // e.g. Running, Cycling, Walking
  duration: { type: Number}, // in minutes
  caloriesBurned: { type: Number, required: true },
});

const dailyFoodSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: () => new Date().setHours(0, 0, 0, 0), // ensures one per day
  },
  breakfast: [mealItemSchema],
  lunch: [mealItemSchema],
  dinner: [mealItemSchema],
  activities: [activitySchema], // ✅ stores all daily activities
  waterIntake: { type: Number, default: 0 },
  intakeCalories: { type: Number, default: 0 },
  burnedCalories: { type: Number, default: 0 },
});

const userFoodSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    foodLog: [dailyFoodSchema],
  },
  { timestamps: true },
  { versionKey: false }
);

const UserFoodModel =
  mongoose.models.UserFood || mongoose.model("UserFood", userFoodSchema);

export default UserFoodModel;
