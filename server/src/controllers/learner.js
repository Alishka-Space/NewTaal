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
      dateOfBirth: user.dateOfBirth,
    });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to create learner, try again later",
    });
  }
};

export const getLearner = async (req, res) => {
  const { id } = req.params;
  try {
    const learner = await Learner.findOne({ user_id: id });
    res.status(200).json({ success: true, result: learner });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to get learner, try again later" });
  }
};

export const updateLearner = async (req, res) => {
  const { id } = req.params;
  const { purpose, bio, languageProficiency, username, nationality, email } =
    req.body;

  const learner = await Learner.findOne({ _id: id });

  if (!learner) {
    return res.status(404).json({ success: false, msg: "Learner not found" });
  }

  if (
    !purpose &&
    !bio &&
    !languageProficiency &&
    !username &&
    !nationality &&
    !email
  ) {
    return res.status(400).json({
      success: false,
      msg: "Please provide at least one field to update",
    });
  }

  try {
    await Learner.findOneAndUpdate(
      { _id: id },
      {
        languageProficiency,
        purpose,
        bio,
        username,
        nationality,
        email,
      },
    );
    res.status(200).json({
      success: true,
      msg: "Learner updated successfully",
      result: learner,
    });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to update learner, try again later",
    });
  }
};
