import { Router } from "express";
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getOrderById,
  recoverOrder,
  updateOrder,
} from "../controllers/order.controller";

const router = Router();

// Routes
router.post("/", createOrder);
router.put("/:id", updateOrder);
router.get("/", getAllOrders);
router.get("/all", getAllOrders);
router.get("/:id", getOrderById);
router.delete("/:id", deleteOrder);
router.patch("/:id", recoverOrder );
export default router;