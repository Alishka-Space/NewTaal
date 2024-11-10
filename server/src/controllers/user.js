import User, { validateUser } from "../models/User.js";
import { logError } from "../util/logging.js";
import validationErrorMessage from "../util/validationErrorMessage.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { createCoach } from "./coach.js";
import { createLearner } from "./learner.js";
import { createAvailability } from "./availability.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, result: users });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to get users, try again later" });
  }
};

export const createUser = async (req, res) => {
  try {
    const { user } = req.body;

    if (typeof user !== "object") {
      res.status(400).json({
        success: false,
        msg: `You need to provide a 'user' object. Received: ${JSON.stringify(
          user,
        )}`,
      });

      return;
    }

    const errorList = validateUser(user);

    if (errorList.length > 0) {
      res
        .status(400)
        .json({ success: false, msg: validationErrorMessage(errorList) });
    } else {
      user.password = await hashPassword(user.password);
      const newUser = await User.create(user);

      if (user.role === "learner") {
        await createLearner(newUser, req, res);
      }

      if (user.role === "coach") {
        await createCoach(newUser, req, res);
        await createAvailability(newUser, req, res);
      }

      res.status(201).json({ success: true, user: newUser });
    }
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to create user, try again later" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        success: false,
        msg: "You need to provide both email and password",
      });

      return;
    }

    const userFromDb = await User.findOne({ email });

    if (!userFromDb) {
      res.status(404).json({ success: false, msg: "User not found" });
      return;
    }

    const isPasswordCorrect = await comparePassword(
      password,
      userFromDb.password,
    );

    if (!isPasswordCorrect) {
      res.status(401).json({ success: false, msg: "Invalid password" });
      return;
    }

    const token = generateToken(userFromDb);
    const userData = getUserFromToken(token);
    const userInformation = await User.findOne({ email });

    res.status(200).json({ success: true, token, userData, userInformation });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to login, try again later" });
  }
};

export const getUserInfo = async (req, res) => {
  try {
    const token = extractToken(req);
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      res.status(404).json({ success: false, msg: "User not found" });
      return;
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to get user info, try again later",
    });
  }
};

//Helper functions

//Helper function to hash password
const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

//Helper function to compare password
const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

//Helper function to generate JWT token
const generateToken = (user) => {
  return jwt.sign({ email: user.email }, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });
};

// Helper function to extract token from request
const extractToken = (req) => {
  const header = req.headers.authorization;
  return header.split(" ")[1];
};

// Helper function to get user from token
const getUserFromToken = (token) => {
  return jwt.verify(token, process.env.SECRET_KEY);
};
