import {Router} from "express";
import {
  createFormula,
  hardDeleteFormula,
  softDeleteFormula,
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
router.get("/:id", getFormulaById);
router.delete("/soft/:id", softDeleteFormula);
router.delete("/hard/:id", hardDeleteFormula);

router.patch("/:id", recoverFormula);

export default router;
