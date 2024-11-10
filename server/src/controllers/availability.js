import Availability, { validateAvailability } from "../models/Availability.js";
import { logError } from "../util/logging.js";
import validationErrorMessage from "../util/validationErrorMessage.js";

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

export const createAvailability = async (user, req, res) => {
  try {
    const availability = {
      coach_id: user._id,
      daysOfWeek: [],
      timeSlots: [],
      toggleAvailability: false,
    };

    await Availability.create(availability);
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

export const updateAvailability = async (req, res) => {
  try {
    const { daysOfWeek, timeSlots, toggleAvailability } = req.body;
    const { id } = req.params;

    if (daysOfWeek == null) {
      return res
        .status(400)
        .json({ success: false, msg: "daysOfWeek is required" });
    }

    if (timeSlots == null) {
      return res
        .status(400)
        .json({ success: false, msg: "timeSlots is required" });
    }

    if (toggleAvailability == null) {
      return res
        .status(400)
        .json({ success: false, msg: "toggleAvailability is required" });
    }

    const availability = {
      daysOfWeek,
      timeSlots,
      toggleAvailability: true,
    };

    const errorList = validateAvailability(availability);

    if (errorList.length > 0) {
      return res
        .status(400)
        .json({ success: false, msg: validationErrorMessage(errorList) });
    } else {
      const updatedAvailability = await Availability.findOneAndUpdate(
        { coach_id: id },
        availability,
        { new: true },
      );

      if (!updatedAvailability) {
        return res.status(404).json({
          success: false,
          msg: `Availability for a coach with the id ${id} not found`,
        });
      } else {
        return res
          .status(200)
          .json({ success: true, availability: updatedAvailability });
      }
    }
  } catch (error) {
    logError(error);
    return res.status(500).json({
      success: false,
      msg: "Unable to update availability, try again later",
    });
  }
};
