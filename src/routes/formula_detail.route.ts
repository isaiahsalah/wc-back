import { Router } from "express";
import {
  createFormulaDetail,
  deleteFormulaDetail,
  getAllFormulaDetails,
  getFormulaDetailById,
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

export default router;