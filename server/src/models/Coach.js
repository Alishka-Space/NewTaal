import mongoose from "mongoose";

import validateAllowedFields from "../util/validateAllowedFields.js";

const coachSchema = new mongoose.Schema({
  coach_id: {
    type: String,
    required: true,
    unique: true,
    default: () => new mongoose.Types.ObjectId().toString(),
  },
  user_id: { type: String, required: true, ref: "users" },
  rating: { type: Number, default: 0.0, min: 0, max: 5 },
  bio: { type: String },
  image: {
    type: String,
    default:
      "https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black-thumbnail.png",
  },
  teachingLevel: { type: String, required: true },
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