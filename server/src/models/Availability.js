import mongoose from "mongoose";

import validateAllowedFields from "../util/validateAllowedFields.js";

const availabilitySchema = new mongoose.Schema({
  availability_id: {
    type: String,
    required: true,
    unique: true,
    default: () => new mongoose.Types.ObjectId().toString(),
  },
  coach_id: { type: String, required: true, ref: "coaches" },
  day_of_week: { type: String, required: true },
  time: { type: String, required: true },
  availability_toggled: { type: Boolean, required: true, default: true },
});

const Availability = mongoose.model("availability", availabilitySchema);

export const validateAvailability = (availabilityObject) => {
  const errorList = [];
  const allowedKeys = [
    "coach_id",
    "day_of_week",
    "time",
    "availability_toggled",
  ];

  const validatedKeysMessage = validateAllowedFields(
    availabilityObject,
    allowedKeys,
  );

  if (validatedKeysMessage.length > 0) {
    errorList.push(validatedKeysMessage);
  }
  if (availabilityObject.day_of_week == null) {
    errorList.push("day_of_week is a required field");
  }
  if (availabilityObject.time == null) {
    errorList.push("time is a required field");
  }
  if (availabilityObject.availability_toggled == null) {
    errorList.push("availability_toggled is a required field");
  }

  return errorList;
};

export default Availability;
