import { Router } from "express";
import {
  createWarehouse,
  deleteWarehouse,
  getAllWarehouses,
  getWarehouseById,
  updateWarehouse,
} from "../controllers/warehouse.controller";

const router = Router();

// Routes
router.post("/", createWarehouse);
router.put("/:id", updateWarehouse);
router.get("/", getAllWarehouses);
router.get("/all", getAllWarehouses);
router.get("/:id", getWarehouseById);
router.delete("/:id", deleteWarehouse);

export default router;