import express from "express";
import {
  createLearner,
  getLearners,
  getLearner,
} from "../controllers/learner.js";

const learnerRouter = express.Router();

learnerRouter.get("/", getLearners);
learnerRouter.post("/create", createLearner);
learnerRouter.post("/profile/:id", getLearner);

export default learnerRouter;
