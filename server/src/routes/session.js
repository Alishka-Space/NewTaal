import express from "express";
import { createSession, getSessions } from "../controllers/session.js";

const sessionRouter = express.Router();

sessionRouter.get("/", getSessions);
sessionRouter.post("/create", createSession);

export default sessionRouter;
