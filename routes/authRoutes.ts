import { Router } from "express";
import { login, logout, registerUser } from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const router = Router();
router.post("/register", registerUser);
router.post("/login", login);
router.get("/logout", authMiddleware,logout);
export default router;
