import mongoose from "mongoose";

import validateAllowedFields from "../util/validateAllowedFields.js";

const coachSchema = new mongoose.Schema({
  user_id: { type: String, required: true, ref: "users" },
  rating: { type: Number, default: 0.0, min: 0, max: 5 },
  bio: { type: String },
  image: {
    type: String,
    default:
      "https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black-thumbnail.png",
  },
  teachingLevel: { type: String },
  username: { type: String },
  email: { type: String },
  role: { type: String },
  languageProficiency: { type: String },
  nationality: { type: String },
  availability: { type: String },
  rate: { type: Number },
  dateOfBirth: { type: Date },
});

const Coach = mongoose.model("coaches", coachSchema);

export const validateCoach = (coachObject) => {
  const errorList = [];
  const allowedKeys = ["bio", "rating", "bio", "image", "teachingLevel"];

  const validatedKeysMessage = validateAllowedFields(coachObject, allowedKeys);

  if (validatedKeysMessage.length > 0) {
    errorList.push(validatedKeysMessage);
  }
};

export default Coach;
