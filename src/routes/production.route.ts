import { Router } from "express";
import {
  createProduction,
  createProductions,
  deleteProduction,
  getAllProductions,
  getProductionById,
  getProductions,
  recoverProduction,
  updateProduction,
} from "../controllers/production.controller";

const router = Router();

// Routes
router.post("/", createProduction);
router.post("/bulk", createProductions);

router.put("/:id", updateProduction);

router.get("/", getProductions);
router.get("/all", getAllProductions);

router.get("/:id", getProductionById);

router.delete("/:id", deleteProduction);
router.patch("/:id", recoverProduction );
export default router;