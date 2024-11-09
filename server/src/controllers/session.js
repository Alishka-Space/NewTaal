import Session from "../models/Session.js";
import { logError } from "../util/logging.js";
import Learner from "../models/Learner.js";
import Coach from "../models/Coach.js";

export const getSessions = async (req, res) => {
  try {
    const sessions = await Session.find();
    res.status(200).json({ success: true, result: sessions });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to get sessions, try again later",
    });
  }
};

export const createSession = async (req, res) => {
  const { learner_id, coach_id, day, time } = req.body;

  // find learner and coach by id

  const learner = await Learner.findOne({ user_id: learner_id }).select(
    "username",
  );
  const coach = await Coach.findOne({ user_id: coach_id }).select("username");

  try {
    const existingSession = await Session.findOne({
      coach_id,
      day,
      time,
    });

    if (existingSession) {
      return res.status(400).json({
        success: false,
        msg: "Session already exists for this time slot.",
      });
    }

    const session = await Session.create({
      learner_id,
      coach_id,
      learner_name: learner.username,
      coach_name: coach.username,
      day,
      time,
      status: "scheduled",
    });

    res.status(201).json({ success: true, result: session });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to create session, try again later.",
    });
  }
};

export const updateSessionStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const session = await Session.findById(id);

    if (!session) {
      return res
        .status(404)
        .json({ success: false, msg: "Session not found." });
    }

    session.status = status;
    await session.save();

    res.status(200).json({ success: true, result: session });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to update session status, try again later.",
    });
  }
};

export const rescheduleSession = async (req, res) => {
  const { id } = req.params;
  const { day, time } = req.body;

  try {
    const existingSession = await Session.findById(id);

    if (!existingSession) {
      return res
        .status(404)
        .json({ success: false, msg: "Session not found." });
    }

    existingSession.status = "rescheduled";

    await existingSession.save();

    const session = new Session({
      learner_id: existingSession.learner_id,
      coach_id: existingSession.coach_id,
      learner_name: existingSession.learner_name,
      coach_name: existingSession.coach_name,
      day,
      time,
      status: "scheduled",
    });

    await session.save();

    res.status(200).json({ success: true, result: session });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to reschedule session, try again later.",
    });
  }
};

export const getUserSessions = async (req, res) => {
  const { id } = req.params;

  try {
    const sessions = await Session.find({
      $or: [{ learner_id: id }, { coach_id: id }],
    });

    res.status(200).json({ success: true, result: sessions });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to get sessions, try again later.",
    });
  }
};
