import {Router} from "express";
import {
  createProductionOrder,
  createProductionOrderWithDetails,
  editProductionOrderWithDetails,
  getProductionOrderById,
  getProductionOrders,
  hardDeleteProductionOrder,
  recoverProductionOrder,
  softDeleteProductionOrder,
  updateProductionOrder,
} from "../controllers/order.controller";

const router = Router();

// Routes
router.post("/details", createProductionOrderWithDetails);
router.put("/details/:id", editProductionOrderWithDetails);
router.post("/", createProductionOrder);
router.put("/:id", updateProductionOrder);
router.get("/", getProductionOrders);
router.get("/:id", getProductionOrderById);
router.delete("/soft/:id", softDeleteProductionOrder);
router.delete("/hard/:id", hardDeleteProductionOrder);
router.patch("/:id", recoverProductionOrder);
export default router;
