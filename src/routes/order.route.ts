import {Router} from "express";
import {
  createOrder,
  createOrderWithDetails,
  deleteOrder,
  editOrderWithDetails,
  getOrderById,
  getOrders,
  recoverOrder,
  updateOrder,
} from "../controllers/order.controller";

const router = Router();

// Routes
router.post("/details", createOrderWithDetails);
router.put("/details/:id", editOrderWithDetails);
router.post("/", createOrder);
router.put("/:id", updateOrder);
router.get("/", getOrders);
router.get("/:id", getOrderById);
router.delete("/:id", deleteOrder);
router.patch("/:id", recoverOrder);
export default router;
