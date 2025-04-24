import { Router } from "express";
import {
  createOrderDetail,
  deleteOrderDetail,
  getAllOrderDetails,
  getOrderDetailById,
  updateOrderDetail,
} from "../controllers/order_detail.controller";

const router = Router();

// Routes
router.post("/", createOrderDetail);
router.put("/:id", updateOrderDetail);
router.get("/", getAllOrderDetails);
router.get("/:id", getOrderDetailById);
router.delete("/:id", deleteOrderDetail);

export default router;