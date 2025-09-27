import express from "express";
import { createReview, getReviewByProduct, updateReview, deleteReview } from "../controllers/reviewControllers.js";
import {authMiddleware} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/product/:productId", getReviewByProduct);
router.post("/", authMiddleware, createReview);
router.put("/:id", authMiddleware, updateReview);
router.delete("/:id", authMiddleware, deleteReview);

export default router;
