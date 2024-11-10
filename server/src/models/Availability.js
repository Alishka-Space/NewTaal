import mongoose from "mongoose";

import validateAllowedFields from "../util/validateAllowedFields.js";

const availabilitySchema = new mongoose.Schema({
  coach_id: { type: String, required: true, ref: "coaches" },
  daysOfWeek: {
    type: [String],
    required: true,
    validate: {
      validator: function (v) {
        const daysOfWeek = [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ];
        return v.every((day) => daysOfWeek.includes(day));
      },
      message: (props) => `${props.value} is not a valid day of the week!`,
    },
  },
  timeSlots: {
    type: [String],
    required: true,
    validate: {
      validator: function (v) {
        return v.every((time) => typeof time === "string");
      },
      message: (props) => `${props.value} is not a valid time slot!`,
    },
  },
  toggleAvailability: { type: Boolean, required: true, default: true },
});

const Availability = mongoose.model("availability", availabilitySchema);

export const validateAvailability = (availabilityObject) => {
  const errorList = [];
  const allowedKeys = [
    "coach_id",
    "daysOfWeek",
    "timeSlots",
    "toggleAvailability",
  ];

  const validatedKeysMessage = validateAllowedFields(
    availabilityObject,
    allowedKeys,
  );

  if (validatedKeysMessage.length > 0) {
    errorList.push(validatedKeysMessage);
  }
  if (availabilityObject.daysOfWeek == null) {
    errorList.push("daysOfWeek is a required field");
  }
  if (availabilityObject.timeSlots == null) {
    errorList.push("timeSlots is a required field");
  }
  if (availabilityObject.toggleAvailability == null) {
    errorList.push("toggleAvailability is a required field");
  }

  return errorList;
};

export default Availability;
