import express from "express";
import { createCoach, getCoaches } from "../controllers/coach.js";

const coachRouter = express.Router();

coachRouter.get("/", getCoaches);
coachRouter.post("/create", createCoach);

export default coachRouter;
