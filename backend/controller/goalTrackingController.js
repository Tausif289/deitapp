import GoalTracking from "../model/goaltrackingmodel.js";

/* ------------------ GET ALL GOALS + WEIGHTS ------------------ */
export const getGoalTracking = async (req, res) => {
  try {
    const { userId } = req.params;
    const data = await GoalTracking.findOne({ userId }); // ✅ only this user's data
    if (!data) {
      // if no record found, create an empty one
      const newData = new GoalTracking({ userId, goals: [], weeklyWeights: [] });
      await newData.save();
      return res.json(newData);
    }
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ------------------ CREATE OR ADD NEW GOAL ------------------ */
export const addGoal = async (req, res) => {
  try {
    const { userId, goal } = req.body;
    console.log(req.body)

    let userData = await GoalTracking.findOne({ userId });

    if (!userData) {
      userData = new GoalTracking({ userId, goals: [goal], weeklyWeights: [] });
    } else {
      userData.goals.push(goal);
    }

    await userData.save();
    res.status(201).json(userData);
  } catch (error) {
    res.status(500).json({ message: "Error adding goal", error });
    console.error("Error in addGoal:", error);
  }
};

/* ------------------ UPDATE EXISTING GOAL ------------------ */
export const updateGoal = async (req, res) => {
  try {
    const { userId, goalId } = req.params;
    const updatedGoal = req.body;

    const data = await GoalTracking.findOneAndUpdate(
      { userId, "goals._id": goalId },
      { $set: { "goals.$": updatedGoal } },
      { new: true }
    );

    if (!data) return res.status(404).json({ message: "Goal not found" });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error updating goal", error });
  }
};

/* ------------------ REMOVE GOAL ------------------ */
export const removeGoal = async (req, res) => {
  try {
    const { userId, goalId } = req.params;

    const data = await GoalTracking.findOneAndUpdate(
      { userId },
      { $pull: { goals: { _id: goalId } } },
      { new: true }
    );

    if (!data) return res.status(404).json({ message: "Goal not found" });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error removing goal", error });
  }
};

/* ------------------ ADD WEEKLY WEIGHT ENTRY ------------------ */
export const addWeightEntry = async (req, res) => {
   try {
    const { userId, entry } = req.body;
    let data = await GoalTracking.findOne({ userId });

    if (!data) {
      data = new GoalTracking({ userId, goals: [], weeklyWeights: [entry] });
    } else {
      data.weeklyWeights.push(entry);
    }
    await data.save();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ------------------ UPDATE WEIGHT ENTRY ------------------ */
export const updateWeightEntry = async (req, res) => {
  try {
    const { userId, entryId } = req.params;
    const updatedEntry = req.body;

    const data = await GoalTracking.findOneAndUpdate(
      { userId, "weeklyWeights._id": entryId },
      { $set: { "weeklyWeights.$": updatedEntry } },
      { new: true }
    );

    if (!data) return res.status(404).json({ message: "Weight entry not found" });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error updating weight entry", error });
  }
};

/* ------------------ REMOVE WEIGHT ENTRY ------------------ */
export const removeWeightEntry = async (req, res) => {
  try {
    const { userId, entryId } = req.params;

    const data = await GoalTracking.findOneAndUpdate(
      { userId },
      { $pull: { weeklyWeights: { _id: entryId } } },
      { new: true }
    );

    if (!data) return res.status(404).json({ message: "Entry not found" });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error removing weight entry", error });
  }
};
