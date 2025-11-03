
import UserFoodModel from "../model/userFoodModel.js";
// 🍽️ Add Food
export const addFood = async (req, res) => {
  try {
    const { userId, username, mealType, foodItem } = req.body;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let userFood = await UserFoodModel.findOne({ userId });

    // if user not found, create new one
    if (!userFood) {
      userFood = new UserFoodModel({
        userId,
        username,
        foodLog: [],
      });
    }

    // find today’s existing log
    let todayLog = userFood.foodLog.find(
      (entry) => new Date(entry.date).setHours(0, 0, 0, 0) === today.getTime()
    );

    // if not found, create new day log
    if (!todayLog) {
      todayLog = {
        date: today,
        breakfast: [],
        lunch: [],
        dinner: [],
        activities: [],
        intakeCalories: 0,
        caloriesBurned: 0,
      };
      userFood.foodLog.push(todayLog);
    }

    // build food object
    const formattedFood = {
      name: foodItem.name,
      calories: foodItem.calories,
      protein: foodItem.protein,
      carbs: foodItem.carbs,
      fat: foodItem.fat,
      quantity: foodItem.quantity,
    };

    // add food to the correct meal
    todayLog[mealType] = [...todayLog[mealType], formattedFood];
    todayLog.intakeCalories += foodItem.calories;

    // mark modified since we mutated nested data
    userFood.markModified('foodLog');
    await userFood.save();

    res.status(200).json({
      message: "Food added successfully",
      userFood,
    });
  } catch (error) {
    console.error("Error adding food:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 🏃‍♂️ Add Activity
export const addActivity = async (req, res) => {
  try {
    const { userId, username, activity } = req.body;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if user exists
    let userFood = await UserFoodModel.findOne({ userId });

    // If user doesn't exist, create new user with today's log
    if (!userFood) {
      userFood = await UserFoodModel.create({
        userId,
        username,
        foodLog: [{
          date: today,
          breakfast: [],
          lunch: [],
          dinner: [],
          activities: [activity],
          intakeCalories: 0,
          burnedCalories: activity.caloriesBurned || 0
        }]
      });

      return res.status(201).json({
        message: "Activity added successfully for new user",
        userFood,
      });
    }

    // ✅ Use atomic update to add activity safely
    const updatedUserFood = await UserFoodModel.findOneAndUpdate(
      { userId, 'foodLog.date': today },
      {
        $push: { 'foodLog.$.activities': activity },
        $inc: { 'foodLog.$.burnedCalories': activity.caloriesBurned || 0 }
      },
      { new: true }
    );

    // If today's log did not exist yet, add a new day log
    if (!updatedUserFood) {
      userFood.foodLog.push({
        date: today,
        breakfast: [],
        lunch: [],
        dinner: [],
        activities: [activity],
        intakeCalories: 0,
        burnedCalories: activity.caloriesBurned || 0
      });

      await userFood.save();
      return res.status(201).json({
        message: "Activity added successfully for new day log",
        userFood,
      });
    }

    res.status(200).json({
      message: "Activity added successfully",
      userFood: updatedUserFood,
    });

  } catch (error) {
    console.error("Error adding activity:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// 📅 Get Daily Log
export const getDailyLog = async (req, res) => {
  try {
    const { userId, date } = req.params;
    const day = new Date(date);
    day.setHours(0, 0, 0, 0);

    const userFood = await UserFoodModel.findOne({ userId });
    if (!userFood) return res.status(404).json({ message: "User not found" });

    const log = userFood.foodLog.find(
      (d) => new Date(d.date).setHours(0, 0, 0, 0) === day.getTime()
    );

    if (!log)
      return res.status(404).json({ message: "No log found for this date" });

    res.status(200).json(log);
  } catch (error) {
    console.error("Error fetching daily log:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 👤 Get All Logs
export const getAllLogs = async (req, res) => {
  try {
    const { userId } = req.params;
    const userFood = await UserFoodModel.findOne({ userId });
    if (!userFood) return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      message: "All logs fetched successfully",
      userFood: userFood.toObject(),
    });
  } catch (error) {
    console.error("Error fetching logs:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const addWater = async (req, res) => {
  try {
    const { userId, username, amount } = req.body;
   console.log(amount)
    if (!userId || !amount) {
      return res.status(400).json({ message: "userId and amount are required" });
    }

    // Ensure today's date is normalized (no time)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Find user record
    let user = await UserFoodModel.findOne({ userId });

    // If user doesn’t exist yet, create it
    if (!user) {
      user = await UserFoodModel.create({
        userId,
        username,
        foodLog: [{ date: today, waterIntake: amount }],
      });
      return res.status(201).json({
        message: "Water intake added for new user",
        totalWater: amount,
      });
    }

    // Find today’s log
    let todayLog = user.foodLog.find(
      (log) => new Date(log.date).setHours(0, 0, 0, 0) === today.getTime()
    );

    if (!todayLog) {
      // If today’s log doesn’t exist, add one
      user.foodLog.push({
        date: today,
        waterIntake: amount,
        breakfast: [],
        lunch: [],
        dinner: [],
        activities: [],
        intakeCalories: 0,
        burnedCalories: 0,
      });
    } else {
      // Increment existing day’s water intake
      todayLog.waterIntake = (todayLog.waterIntake || 0) + amount;
    }

    await user.save();

    return res.status(200).json({
      message: "Water intake updated successfully",
      totalWater: todayLog ? todayLog.waterIntake : amount,
    });
  } catch (error) {
    console.error("Error adding water intake:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
