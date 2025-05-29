import {Router} from "express";
import {
  createProduction,
  createProductions,
  getProductionById,
  getProductions,
  hardDeleteProduction,
  recoverProduction,
  softDeleteProduction,
  updateProduction,
} from "../controllers/production.controller";

const router = Router();

// Routes
router.post("/", createProduction);
router.post("/bulk", createProductions);

router.put("/:id", updateProduction);

router.get("/", getProductions);

router.get("/:id", getProductionById);

router.delete("/soft/:id", softDeleteProduction);
router.delete("/hard/:id", hardDeleteProduction);
router.patch("/:id", recoverProduction);
export default router;
