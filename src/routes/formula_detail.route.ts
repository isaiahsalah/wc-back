import {Router} from "express";
import {
  createFormulaDetail,
  deleteFormulaDetail,
  getFormulaDetailById,
  getFormulaDetails,
  recoverFormulaDetail,
  updateFormulaDetail,
} from "../controllers/formula_detail.controller";

const router = Router();

// Routes
router.post("/", createFormulaDetail);
router.put("/:id", updateFormulaDetail);
router.get("/", getFormulaDetails);
router.get("/:id", getFormulaDetailById);
router.delete("/:id", deleteFormulaDetail);
router.patch("/:id", recoverFormulaDetail);

export default router;
