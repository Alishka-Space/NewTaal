import Availability, { validateAvailability } from "../models/Availability.js";
import { logError } from "../util/logging.js";
import validationErrorMessage from "../util/validationErrorMessage.js";
import Coach from "../models/Coach.js";

export const getAvailability = async (req, res) => {
  try {
    const availability = await Availability.find();
    res.status(200).json({ success: true, result: availability });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to get availability, try again later",
    });
  }
};

export const createAvailability = async (req, res) => {
  try {
    const { daysOfWeek, timeSlots, toggleAvailability } = req.body;
    const { id } = req.params;

    if (daysOfWeek == null) {
      res.status(400).json({ success: false, msg: "daysOfWeek is required" });
    }

    if (timeSlots == null) {
      res.status(400).json({ success: false, msg: "timeSlots is required" });
    }

    if (toggleAvailability == null) {
      res
        .status(400)
        .json({ success: false, msg: "toggleAvailability is required" });
    }

    const coach = await Coach.findOne({ user_id: id });

    if (!coach) {
      res
        .status(404)
        .json({ success: false, msg: `Coach with id ${id} not found` });
      return;
    }

    const availability = {
      coach_id: id,
      daysOfWeek,
      timeSlots,
      toggleAvailability,
    };

    const errorList = validateAvailability(availability);

    if (errorList.length > 0) {
      res
        .status(400)
        .json({ success: false, msg: validationErrorMessage(errorList) });
    } else {
      const newAvailability = await Availability.create(availability);

      res.status(201).json({ success: true, availability: newAvailability });
    }
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to create availability, try again later",
    });
  }
};

export const getAvailabilityByCoachId = async (req, res) => {
  const { id } = req.params;
  try {
    const availability = await Availability.find({ coach_id: id });
    res.status(200).json({ success: true, result: availability });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to get availability, try again later",
    });
  }
};
