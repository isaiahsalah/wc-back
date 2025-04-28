import { Router } from "express";
import {
  createOrderDetail,
  deleteOrderDetail,
  getAllOrderDetails,
  getOrderDetailById,
  getOrderDetails,
  getOrderDetails_date,
  recoverOrderDetail,
  updateOrderDetail,
} from "../controllers/order_detail.controller";

const router = Router();

// Routes
router.get("/date", getOrderDetails_date);
//////////////////////////////////////////////////////////////

router.post("/", createOrderDetail);
router.put("/:id", updateOrderDetail);
router.get("/", getOrderDetails);
router.get("/all", getAllOrderDetails);
router.get("/:id", getOrderDetailById);
router.delete("/:id", deleteOrderDetail);
router.patch("/:id", recoverOrderDetail );


export default router;