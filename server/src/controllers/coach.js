import Coach from "../models/Coach.js";
import { logError } from "../util/logging.js";

export const getCoaches = async (req, res) => {
  try {
    const coaches = await Coach.find();
    res.status(200).json({ success: true, result: coaches });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to get coaches, try again later" });
  }
};

export const createCoach = async (userId, req, res) => {
  try {
    await Coach.create({ user_id: userId });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to create learner, try again later",
    });
  }
};
