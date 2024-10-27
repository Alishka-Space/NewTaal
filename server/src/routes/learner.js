import express from "express";
import {
  createLearner,
  getLearners,
  getLearner,
  updateLearner,
} from "../controllers/learner.js";

const learnerRouter = express.Router();

learnerRouter.get("/", getLearners);
learnerRouter.post("/create", createLearner);
learnerRouter.post("/profile/:id", getLearner);
learnerRouter.patch("/update/:id", updateLearner);

export default learnerRouter;
