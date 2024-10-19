import Learner, { validateLearner } from "../models/Learner.js";
import { logError } from "../util/logging.js";
import validationErrorMessage from "../util/validationErrorMessage.js";

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

export const createLearner = async (req, res) => {
  try {
    const { learner } = req.body;

    if (typeof learner !== "object") {
      res.status(400).json({
        success: false,
        msg: `You need to provide a 'learner' object. Received: ${JSON.stringify(
          learner,
        )}`,
      });

      return;
    }

    const errorList = validateLearner(learner);

    if (errorList.length > 0) {
      res
        .status(400)
        .json({ success: false, msg: validationErrorMessage(errorList) });
    } else {
      const newLearner = await Learner.create(learner);

      res.status(201).json({ success: true, learner: newLearner });
    }
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to create learner, try again later",
    });
  }
};
