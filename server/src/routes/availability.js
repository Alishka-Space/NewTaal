import express from "express";
import {
  createAvailability,
  getAvailability,
  getAvailabilityByCoachId,
  updateAvailability,
} from "../controllers/availability.js";

const availabilityRouter = express.Router();

availabilityRouter.get("/", getAvailability);
availabilityRouter.post("/create", createAvailability);
availabilityRouter.get("/coach/:id", getAvailabilityByCoachId);
availabilityRouter.patch("/update/:id", updateAvailability);

export default availabilityRouter;
