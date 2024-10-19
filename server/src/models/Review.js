import mongoose from "mongoose";

import validateAllowedFields from "../util/validateAllowedFields.js";

const reviewSchema = new mongoose.Schema({
  review_id: {
    type: String,
    required: true,
    unique: true,
    default: () => new mongoose.Types.ObjectId().toString(),
  },
  learner_id: { type: String, required: true, ref: "learners" },
  coach_id: { type: String, required: true, ref: "coaches" },
  rating: { type: Number, required: true, min: 0, max: 5 },
  review: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  session_id: { type: String, required: true, ref: "sessions" },
});

const Review = mongoose.model("reviews", reviewSchema);

export const validateReview = (reviewObject) => {
  const errorList = [];
  const allowedKeys = [
    "learner_id",
    "coach_id",
    "rating",
    "review",
    "date",
    "time",
    "session_id",
  ];

  const validatedKeysMessage = validateAllowedFields(reviewObject, allowedKeys);

  if (validatedKeysMessage.length > 0) {
    errorList.push(validatedKeysMessage);
  }
  if (reviewObject.rating == null) {
    errorList.push("rating is a required field");
  }
  if (reviewObject.review == null) {
    errorList.push("review is a required field");
  }
  if (reviewObject.date == null) {
    errorList.push("date is a required field");
  }
  if (reviewObject.time == null) {
    errorList.push("time is a required field");
  }
  if (reviewObject.session_id == null) {
    errorList.push("session_id is a required field");
  }
  return errorList;
};

export default Review;
