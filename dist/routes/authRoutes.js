import { Router } from "express";
import { login, logout, registerUser } from "../controllers/userController";
const router = Router();
router.post("/register", registerUser);
router.post("/login", login);
router.get("/logout", logout);
export default router;
//# sourceMappingURL=authRoutes.js.map