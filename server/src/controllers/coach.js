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
      dateOfBirth: user.dateOfBirth,
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
  const {
    username,
    languageProficiency,
    teachingLevel,
    bio,
    rate,
    nationality,
    datOfBirth,
  } = req.body;

  const coach = await Coach.findOne({ _id: id });

  if (!coach) {
    return res.status(404).json({ success: false, msg: "Coach not found" });
  }

  if (
    !username &&
    !languageProficiency &&
    !teachingLevel &&
    !bio &&
    !rate &&
    !nationality &&
    !datOfBirth
  ) {
    return res.status(400).json({
      success: false,
      msg: "Please provide at least one field to update",
    });
  }

  try {
    await Coach.findOneAndUpdate(
      { _id: id },
      {
        languageProficiency,
        teachingLevel,
        bio,
        rate,
        username,
        nationality,
        datOfBirth,
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

export const updateCoachRating = async (coachId, rating) => {
  await Coach.findOneAndUpdate({ user_id: coachId }, { rating });
};
