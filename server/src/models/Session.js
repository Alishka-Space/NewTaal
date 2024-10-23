import mongoose from "mongoose";

import validateAllowedFields from "../util/validateAllowedFields.js";

const sessionSchema = new mongoose.Schema({
  learner_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "learners",
  },
  coach_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "coaches",
  },
  learner_name: { type: String },
  coach_name: { type: String },
  time: { type: String, required: true },
  day: { type: String, required: true },
  status: {
    type: String,
    required: true,
    default: "scheduled",
    enum: ["scheduled", "completed", "cancelled", "rescheduled"],
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  review_id: { type: String, ref: "reviews" },
});

const Session = mongoose.model("sessions", sessionSchema);

export const validateSession = (sessionObject) => {
  const errorList = [];
  const allowedKeys = [
    "learner_id",
    "coach_id",
    "learner_name",
    "coach_name",
    "day",
    "time",
    "status",
    "review_id",
  ];

  const validatedKeysMessage = validateAllowedFields(
    sessionObject,
    allowedKeys,
  );

  if (validatedKeysMessage.length > 0) {
    errorList.push(validatedKeysMessage);
  }
  if (sessionObject.date == null) {
    errorList.push("date is a required field");
  }
  if (sessionObject.time == null) {
    errorList.push("time is a required field");
  }
  if (sessionObject.status == null) {
    errorList.push("status is a required field");
  }
  if (
    sessionObject.status !== "scheduled" &&
    sessionObject.status !== "completed" &&
    sessionObject.status !== "cancelled" &&
    sessionObject.status !== "rescheduled"
  ) {
    errorList.push(
      "status must be either 'Scheduled' or 'Completed' or 'Cancelled'",
    );
  }
  return errorList;
};

export default Session;
