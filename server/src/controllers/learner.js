import Learner from "../models/Learner.js";
import { logError } from "../util/logging.js";

export const getLearners = async (req, res) => {
  try {
    const learners = await Learner.find();
    res.status(200).json({ success: true, result: learners });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to get learners, try again later" });
  }
};

export const createLearner = async (userId, req, res) => {
  try {
    await Learner.create({ user_id: userId });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to create learner, try again later",
    });
  }
};
