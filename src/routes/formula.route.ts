import { Router } from "express";
import {
  createFormula,
  deleteFormula,
  getAllFormulas,
  getFormulaById,
  updateFormula,
} from "../controllers/formula.controller";

const router = Router();

// Routes
router.post("/", createFormula);
router.put("/:id", updateFormula);
router.get("/", getAllFormulas);
router.get("/all", getAllFormulas);
router.get("/:id", getFormulaById);
router.delete("/:id", deleteFormula);

export default router;