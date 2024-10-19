import mongoose from "mongoose";

import validateAllowedFields from "../util/validateAllowedFields.js";

const sessionSchema = new mongoose.Schema({
  session_id: {
    type: String,
    required: true,
    unique: true,
    default: () => new mongoose.Types.ObjectId().toString(),
  },
  learner_id: { type: String, required: true, ref: "learners" },
  coach_id: { type: String, required: true, ref: "coaches" },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  status: { type: String, required: true, default: "Scheduled" },
  review_id: { type: String, ref: "reviews" },
});

const Session = mongoose.model("sessions", sessionSchema);

export const validateSession = (sessionObject) => {
  const errorList = [];
  const allowedKeys = [
    "learner_id",
    "coach_id",
    "date",
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
    sessionObject.status !== "Scheduled" &&
    sessionObject.status !== "Completed" &&
    sessionObject.status !== "Cancelled"
  ) {
    errorList.push(
      "status must be either 'Scheduled' or 'Completed' or 'Cancelled'",
    );
  }
  return errorList;
};

export default Session;
