import express from "express";
import {
  createSession,
  getSessions,
  updateSessionStatus,
  rescheduleSession,
  getUserSessions,
} from "../controllers/session.js";

const sessionRouter = express.Router();

sessionRouter.get("/", getSessions);
sessionRouter.post("/create", createSession);
sessionRouter.patch("/update/:id", updateSessionStatus);
sessionRouter.patch("/reschedule/:id", rescheduleSession);
sessionRouter.get("/user/:id", getUserSessions);

export default sessionRouter;
