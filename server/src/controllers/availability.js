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

export const createAvailability = async (req, res) => {
  try {
    const { availability } = req.body;

    if (typeof availability !== "object") {
      res.status(400).json({
        success: false,
        msg: `You need to provide a 'availability' object. Received: ${JSON.stringify(
          availability,
        )}`,
      });

      return;
    }

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
