import express from "express";
import getRecommendations  from "../controllers/recommendation.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/products/:id/recommendations", authMiddleware,getRecommendations);

export default router;
