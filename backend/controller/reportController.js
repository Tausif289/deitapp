import UserFoodModel from "../model/userFoodModel.js";
import goaltrackingmodel from "../model/goaltrackingmodel.js";

export const getUserReport = async (req, res) => {
  try {
    const userId = req.params.userId;

    /* -------------------- 1️⃣ Get Food Logs (Calories & Nutrition) -------------------- */
    const userFood = await UserFoodModel.findOne({ userId });

    if (!userFood || userFood.foodLog.length === 0) {
      return res.status(404).json({ message: "No food/activity data found" });
    }

    // Sort by date ascending
    const sortedLogs = userFood.foodLog.sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    // Prepare daily calories and nutrition arrays
    const calorieLogs = sortedLogs.map((log) => {
      const totalIntake =
        (log.breakfast?.reduce((sum, m) => sum + (m.calories || 0), 0) || 0) +
        (log.lunch?.reduce((sum, m) => sum + (m.calories || 0), 0) || 0) +
        (log.dinner?.reduce((sum, m) => sum + (m.calories || 0), 0) || 0);

      const totalBurned =
        log.activities?.reduce((sum, a) => sum + (a.caloriesBurned || 0), 0) || 0;

      return {
        date: log.date,
        intakeCalories: totalIntake,
        burnedCalories: totalBurned,
      };
    });

    /* -------------------- 2️⃣ Get Weekly Weight Progress -------------------- */
    const goaltracking = await goaltrackingmodel.findOne({ userId });

    let weightEntries = [];
    if (goaltracking && goaltracking.weeklyWeights.length > 0) {
      weightEntries = goaltracking.weeklyWeights.map((entry) => ({
        date: entry.date,
        weight: entry.weight,
      }));
    }

    /* -------------------- 3️⃣ Activity Breakdown -------------------- */
    const activityMap = {};
    sortedLogs.forEach((log) => {
      log.activities?.forEach((a) => {
        if (!activityMap[a.activityName]) activityMap[a.activityName] = 0;
        activityMap[a.activityName] += a.duration || 0;
      });
    });
    const activities = Object.entries(activityMap).map(([name, duration]) => ({
      activityName: name,
      duration,
    }));

    /* -------------------- 4️⃣ Nutrition Summary -------------------- */
    let totalProtein = 0,
      totalCarbs = 0,
      totalFat = 0,
      totalDays = sortedLogs.length;

    sortedLogs.forEach((log) => {
      const allMeals = [...(log.breakfast || []), ...(log.lunch || []), ...(log.dinner || [])];
      totalProtein += allMeals.reduce((sum, m) => sum + (m.protein || 0), 0);
      totalCarbs += allMeals.reduce((sum, m) => sum + (m.carbs || 0), 0);
      totalFat += allMeals.reduce((sum, m) => sum + (m.fat || 0), 0);
    });

    const nutritionSummary = {
      protein: Math.round(totalProtein / totalDays),
      carbs: Math.round(totalCarbs / totalDays),
      fat: Math.round(totalFat / totalDays),
    };

    /* -------------------- ✅ Final Response -------------------- */
    res.json({
      calorieLogs,
      weightEntries,
      activities,
      nutritionSummary,
    });
  } catch (err) {
    console.error("Error fetching user report:", err);
    res.status(500).json({ message: "Error fetching report data", error: err.message });
  }
};
