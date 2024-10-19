import mongoose from "mongoose";

import validateAllowedFields from "../util/validateAllowedFields.js";

const learnerSchema = new mongoose.Schema({
  learner_id: {
    type: String,
    required: true,
    unique: true,
    default: () => new mongoose.Types.ObjectId().toString(),
  },
  user_id: { type: String, required: true, ref: "users" },
  bio: { type: String },
  purpose: { type: String },
  image: {
    type: String,
    default:
      "https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black-thumbnail.png",
  },
});

const Learner = mongoose.model("learners", learnerSchema);

export const validateLearner = (learnerObject) => {
  const errorList = [];
  const allowedKeys = ["bio", "bio", "purpose", "image"];

  const validatedKeysMessage = validateAllowedFields(
    learnerObject,
    allowedKeys,
  );

  if (validatedKeysMessage.length > 0) {
    errorList.push(validatedKeysMessage);
  }
};

export default Learner;
