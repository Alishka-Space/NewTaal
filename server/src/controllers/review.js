import Review, { validateReview } from "../models/Review.js";
import { logError } from "../util/logging.js";
import Session from "../models/Session.js";
import validationErrorMessage from "../util/validationErrorMessage.js";
import { updateCoachRating } from "./coach.js";
import Coach from "../models/Coach.js";

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
  const { rating, comments } = req.body;
  const { id } = req.params;
  const session = await Session.findById(id);
  const coach = await Coach.findOne({ user_id: session.coach_id });

  try {
    if (!session) {
      return res.status(404).json({
        success: false,
        msg: `Session with id ${id} not found`,
      });
    }
    const reviewObject = {
      learner_id: session.learner_id,
      learner_name: session.learner_name,
      coach_id: session.coach_id,
      session_id: id,
      rating,
      comments,
    };

    const existingReview = await Review.findOne({
      session_id: id,
    });
    if (existingReview) {
      return res.status(400).json({
        success: false,
        msg: "Review already exists for this session",
      });
    }

    const errors = validateReview(reviewObject);
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        msg: validationErrorMessage(errors),
      });
    }
    const review = new Review(reviewObject);
    await review.save();

    const coachRating = await coachTotalRating(coach.user_id);
    await updateCoachRating(coach.user_id, coachRating);

    res.status(201).json({ success: true, result: review });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to create review, try again later",
    });
  }
};

export const getReviewsByCoachId = async (req, res) => {
  const { id } = req.params;
  try {
    const reviews = await Review.find({ coach_id: id });
    res.status(200).json({ success: true, result: reviews });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to get reviews, try again later" });
  }
};

// Helper function to calculate the total rating of a coach

const coachTotalRating = async (coachId) => {
  const reviews = await Review.find({ coach_id: coachId });
  const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
  const rating = totalRating / reviews.length;
  return rating;
};
