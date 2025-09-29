import express from "express";

import { authMiddleware } from "../middleware/authMiddleware.js";
import { getRecommendations, getRecommendationsByText } from "../controllers/recommendation.js";

const router = express.Router();

router.get("/products/:id/recommendations", authMiddleware,getRecommendations);
router.post("/products/recommendations/text", authMiddleware,getRecommendationsByText);

export default router;
