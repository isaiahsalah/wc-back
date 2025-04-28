import { Router } from "express";
import {
  createFormula,
  deleteFormula,
  getAllFormulas,
  getFormulaById,
  getFormulas,
  recoverFormula,
  updateFormula,
} from "../controllers/formula.controller";

const router = Router();

// Routes
router.post("/", createFormula);
router.put("/:id", updateFormula);
router.get("/", getFormulas);
router.get("/all", getAllFormulas);
router.get("/:id", getFormulaById);
router.delete("/:id", deleteFormula);
router.patch("/:id", recoverFormula );

export default router;