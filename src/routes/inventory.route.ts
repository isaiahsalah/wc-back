import { Router } from "express";
import {
  createInventory,
  deleteInventory,
  getAllInventories,
  getInventories,
  getInventoryById,
  recoverInventory,
  updateInventory,
} from "../controllers/inventory.controller";

const router = Router();

// Routes
router.post("/", createInventory);
router.put("/:id", updateInventory);
router.get("/", getInventories);
router.get("/all", getAllInventories);
router.get("/:id", getInventoryById);
router.delete("/:id", deleteInventory);
router.patch("/:id", recoverInventory );
export default router;