import express from "express";
import {
  createSession,
  getSessions,
  updateSessionStatus,
  rescheduleSession,
} from "../controllers/session.js";

const sessionRouter = express.Router();

sessionRouter.get("/", getSessions);
sessionRouter.post("/create", createSession);
sessionRouter.patch("/update/:id", updateSessionStatus);
sessionRouter.patch("/reschedule/:id", rescheduleSession);

export default sessionRouter;
