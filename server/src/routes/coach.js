import express from "express";
import { createCoach, getCoaches, getCoach } from "../controllers/coach.js";

const coachRouter = express.Router();

coachRouter.get("/", getCoaches);
coachRouter.post("/create", createCoach);
coachRouter.post("/profile/:id", getCoach);

export default coachRouter;
