import Review, { validateReview } from "../models/Review.js";
import { logError } from "../util/logging.js";
import validationErrorMessage from "../util/validationErrorMessage.js";

export const getReviews = async (req, res) => {
  try {
    const reviewes = await Review.find();
    res.status(200).json({ success: true, result: reviewes });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to get reviewes, try again later" });
  }
};

export const createReview = async (req, res) => {
  try {
    const { review } = req.body;

    if (typeof review !== "object") {
      res.status(400).json({
        success: false,
        msg: `You need to provide a 'review' object. Received: ${JSON.stringify(
          review,
        )}`,
      });

      return;
    }

    const errorList = validateReview(review);

    if (errorList.length > 0) {
      res
        .status(400)
        .json({ success: false, msg: validationErrorMessage(errorList) });
    } else {
      const newReview = await Review.create(review);

      res.status(201).json({ success: true, review: newReview });
    }
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to create review, try again later",
    });
  }
};
