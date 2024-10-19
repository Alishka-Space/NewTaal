import express from "express";
import { createReview, getReviews } from "../controllers/review.js";

const reviewRouter = express.Router();

reviewRouter.get("/", getReviews);
reviewRouter.post("/create", createReview);

export default reviewRouter;
