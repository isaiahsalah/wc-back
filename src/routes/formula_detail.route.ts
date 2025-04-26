import { Router } from "express";
import {
  createFormulaDetail,
  deleteFormulaDetail,
  getAllFormulaDetails,
  getFormulaDetailById,
  recoverFormulaDetail,
  updateFormulaDetail,
} from "../controllers/formula_detail.controller";

const router = Router();

// Routes
router.post("/", createFormulaDetail);
router.put("/:id", updateFormulaDetail);
router.get("/", getAllFormulaDetails);
router.get("/all", getAllFormulaDetails);
router.get("/:id", getFormulaDetailById);
router.delete("/:id", deleteFormulaDetail);
router.patch("/:id", recoverFormulaDetail);

export default router;