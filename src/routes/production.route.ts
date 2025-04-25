import { Router } from "express";
import {
  createProduction,
  deleteProduction,
  getAllProductions,
  getProductionById,
  updateProduction,
} from "../controllers/production.controller";

const router = Router();

// Routes
router.post("/", createProduction);
router.put("/:id", updateProduction);
router.get("/", getAllProductions);
router.get("/all", getAllProductions);

router.get("/:id", getProductionById);
router.delete("/:id", deleteProduction);

export default router;