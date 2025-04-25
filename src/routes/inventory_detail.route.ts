import { Router } from "express";
import {
  createInventoryDetail,
  deleteInventoryDetail,
  getAllInventoryDetails,
  getInventoryDetailById,
  updateInventoryDetail,
} from "../controllers/inventory_detail.controller";

const router = Router();

// Routes
router.post("/", createInventoryDetail);
router.put("/:id", updateInventoryDetail);
router.get("/", getAllInventoryDetails);
router.get("/all", getAllInventoryDetails);
router.get("/:id", getInventoryDetailById);
router.delete("/:id", deleteInventoryDetail);

export default router;