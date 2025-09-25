import { Router } from "express";
import { login, logout, registerUser } from "../controllers/userController";
import { authMiddleware } from "../middleware/authMiddleware";
const router = Router();
router.post("/register", registerUser);
router.post("/login", login);
router.get("/logout", authMiddleware, logout);
export default router;
//# sourceMappingURL=authRoutes.js.map