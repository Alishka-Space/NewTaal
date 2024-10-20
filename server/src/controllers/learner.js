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

export const createLearner = async (user, req, res) => {
  try {
    await Learner.create({
      user_id: user._id,
      username: user.name,
      email: user.email,
      role: user.role,
      languageProficiency: user.languageProficiency,
      nationality: user.nationality,
      purpose: "",
      bio: "",
    });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to create learner, try again later",
    });
  }
};
