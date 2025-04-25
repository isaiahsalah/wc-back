import { Router } from "express";
import {
  createInventory,
  deleteInventory,
  getAllInventories,
  getInventoryById,
  updateInventory,
} from "../controllers/inventory.controller";

const router = Router();

// Routes
router.post("/", createInventory);
router.put("/:id", updateInventory);
router.get("/", getAllInventories);
router.get("/all", getAllInventories);
router.get("/:id", getInventoryById);
router.delete("/:id", deleteInventory);

export default router;