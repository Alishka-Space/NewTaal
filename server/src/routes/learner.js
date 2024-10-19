import express from "express";
import { createLearner, getLearners } from "../controllers/learner.js";

const learnerRouter = express.Router();

learnerRouter.get("/", getLearners);
learnerRouter.post("/create", createLearner);

export default learnerRouter;
