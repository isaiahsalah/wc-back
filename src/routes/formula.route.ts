import {Router} from "express";
import {
  createFormula,
  hardDeleteFormula,
  softDeleteFormula,
  getFormulaById,
  getFormulas,
  recoverFormula,
  updateFormula,
  updateActiveFormula,
  updateUnactiveFormula,
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

router.put("/active/:id", updateActiveFormula);
router.put("/unactive/:id", updateUnactiveFormula);

export default router;
