import Coach, { validateCoach } from "../models/Coach.js";
import { logError } from "../util/logging.js";
import validationErrorMessage from "../util/validationErrorMessage.js";

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

export const createCoach = async (req, res) => {
  try {
    const { coach } = req.body;

    if (typeof coach !== "object") {
      res.status(400).json({
        success: false,
        msg: `You need to provide a 'coach' object. Received: ${JSON.stringify(
          coach,
        )}`,
      });

      return;
    }

    const errorList = validateCoach(coach);

    if (errorList.length > 0) {
      res
        .status(400)
        .json({ success: false, msg: validationErrorMessage(errorList) });
    } else {
      const newCoach = await Coach.create(coach);

      res.status(201).json({ success: true, coach: newCoach });
    }
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to create coach, try again later" });
  }
};
