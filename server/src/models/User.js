import mongoose from "mongoose";

import validateAllowedFields from "../util/validateAllowedFields.js";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default: "learner" },
  dateOfBirth: { type: Date },
  nationality: { type: String },
  languageProficiency: { type: String },
  dateOfCreation: { type: Date, default: Date.now },
});

const User = mongoose.model("users", userSchema);

export const validateUser = (userObject) => {
  const errorList = [];
  const allowedKeys = [
    "name",
    "email",
    "password",
    "role",
    "dateOfBirth",
    "nationality",
    "languageProficiency",
  ];

  const validatedKeysMessage = validateAllowedFields(userObject, allowedKeys);

  if (validatedKeysMessage.length > 0) {
    errorList.push(validatedKeysMessage);
  }

  if (userObject.name == null) {
    errorList.push("name is a required field");
  }

  if (userObject.email == null) {
    errorList.push("email is a required field");
  }

  if (userObject.password == null) {
    errorList.push("password is a required field");
  }

  if (userObject.role == null) {
    errorList.push("role is a required field");
  }

  if (userObject.role !== "learner" && userObject.role !== "coach") {
    errorList.push("role must be either 'learner' or 'coach'");
  }

  return errorList;
};

export default User;
