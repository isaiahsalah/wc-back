import { Router } from "express";
import {
  createOrder,
  createOrderWithDetails,
  deleteOrder,
  getAllOrders,
  getOrderById,
  getOrders,
  recoverOrder,
  updateOrder,
} from "../controllers/order.controller";

const router = Router();

// Routes
router.post("/", createOrder);
router.post("/WithDetails", createOrderWithDetails);
router.put("/:id", updateOrder);
router.get("/", getOrders);
router.get("/all", getAllOrders);
router.get("/:id", getOrderById);
router.delete("/:id", deleteOrder);
router.patch("/:id", recoverOrder);
export default router;
