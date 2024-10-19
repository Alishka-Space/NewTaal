import express from "express";
import cors from "cors";

import userRouter from "./routes/user.js";
import sessionRouter from "./routes/session.js";
import coachRouter from "./routes/coach.js";
import learnerRouter from "./routes/learner.js";
import reviewRouter from "./routes/review.js";
import availabilityRouter from "./routes/availability.js";

// Create an express server
const app = express();

// Tell express to use the json middleware
app.use(express.json());
// Allow everyone to access our API. In a real application, we would need to restrict this!
app.use(cors());

/****** Attach routes ******/
/**
 * We use /api/ at the start of every route!
 * As we also host our client code on heroku we want to separate the API endpoints.
 */
app.use("/api/user", userRouter);
app.use("/api/session", sessionRouter);
app.use("/api/coach", coachRouter);
app.use("/api/learner", learnerRouter);
app.use("/api/review", reviewRouter);
app.use("/api/availability", availabilityRouter);

export default app;
