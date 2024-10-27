import express from "express";
import {
  createCoach,
  getCoaches,
  getCoach,
  updateCoach,
} from "../controllers/coach.js";

const coachRouter = express.Router();

coachRouter.get("/", getCoaches);
coachRouter.post("/create", createCoach);
coachRouter.post("/profile/:id", getCoach);
coachRouter.patch("/update/:id", updateCoach);

export default coachRouter;
