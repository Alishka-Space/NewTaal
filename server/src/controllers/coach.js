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

export const createCoach = async (user, req, res) => {
  try {
    await Coach.create({
      user_id: user._id,
      username: user.name,
      email: user.email,
      role: user.role,
      languageProficiency: user.languageProficiency,
      nationality: user.nationality,
      teachingLevel: "",
      bio: "",
      rate: 0,
      availability: "",
    });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to create coach, try again later",
    });
  }
};

export const getCoach = async (req, res) => {
  const { id } = req.params;
  try {
    const coach = await Coach.findOne({ user_id: id });
    res.status(200).json({ success: true, result: coach });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to get coach, try again later" });
  }
};

export const updateCoach = async (req, res) => {
  const { id } = req.params;
  const { languageProficiency, teachingLevel, bio, rate } = req.body;
  try {
    await Coach.findOneAndUpdate(
      { user_id: id },
      {
        languageProficiency,
        teachingLevel,
        bio,
        rate,
      },
    );
    res.status(200).json({ success: true, msg: "Coach updated successfully" });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to update coach, try again later" });
  }
};
