import mongoose from "mongoose";

import validateAllowedFields from "../util/validateAllowedFields.js";

const reviewSchema = new mongoose.Schema({
  learner_id: { type: String, required: true, ref: "learners" },
  learner_name: { type: String },
  coach_id: { type: String, required: true, ref: "coaches" },
  session_id: { type: String, required: true, ref: "sessions" },
  rating: { type: Number, required: true, min: 0, max: 5 },
  comments: { type: String, required: true },
  dateCreated: { type: Date, default: Date.now },
});

const Review = mongoose.model("reviews", reviewSchema);

export const validateReview = (reviewObject) => {
  const errorList = [];
  const allowedKeys = [
    "learner_id",
    "learner_name",
    "coach_id",
    "rating",
    "comments",
    "session_id",
  ];

  const validatedKeysMessage = validateAllowedFields(reviewObject, allowedKeys);

  if (validatedKeysMessage.length > 0) {
    errorList.push(validatedKeysMessage);
  }
  if (reviewObject.rating == null) {
    errorList.push("rating is a required field");
  }
  if (reviewObject.comments == null) {
    errorList.push("review is a required field");
  }
  if (reviewObject.session_id == null) {
    errorList.push("session_id is a required field");
  }
  return errorList;
};

export default Review;
