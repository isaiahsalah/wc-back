import {Router} from "express";
import {
  createOrderDetail,
  deleteOrderDetail,
  getOrderDetailById,
  getOrderDetails,
  recoverOrderDetail,
  updateOrderDetail,
} from "../controllers/order_detail.controller";

const router = Router();

// Routes

router.post("/", createOrderDetail);
router.put("/:id", updateOrderDetail);
router.get("/", getOrderDetails);
router.get("/:id", getOrderDetailById);
router.delete("/:id", deleteOrderDetail);
router.patch("/:id", recoverOrderDetail);

export default router;
