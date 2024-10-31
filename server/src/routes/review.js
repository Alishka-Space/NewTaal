import express from "express";
import {
  createReview,
  getReviews,
  getReviewsByCoachId,
} from "../controllers/review.js";

const reviewRouter = express.Router();

reviewRouter.get("/", getReviews);
reviewRouter.post("/create/:id", createReview);
reviewRouter.get("/coach/:id", getReviewsByCoachId);

export default reviewRouter;
