import express from "express";
import {
  createAvailability,
  getAvailability,
} from "../controllers/availability.js";

const availabilityRouter = express.Router();

availabilityRouter.get("/", getAvailability);
availabilityRouter.post("/create", createAvailability);

export default availabilityRouter;
