import express from "express";
import {
  createAvailability,
  getAvailability,
  getAvailabilityByCoachId,
} from "../controllers/availability.js";

const availabilityRouter = express.Router();

availabilityRouter.get("/", getAvailability);
availabilityRouter.post("/create/:id", createAvailability);
availabilityRouter.get("/coach/:id", getAvailabilityByCoachId);

export default availabilityRouter;
