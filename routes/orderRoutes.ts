import { Router } from "express";
import {
  createOrder,
  getOrderById,
  getOrders,
  updateOrder,
} from "../controllers/ordersControllers.js";

const router = Router();

router.post("/", createOrder);
router.get("/", getOrders);
router.get("/:id", getOrderById);
router.patch("/:id", updateOrder);
export default router;
