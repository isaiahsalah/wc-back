import { Router } from "express";
import {
  createProductionDetail,
  deleteProductionDetail,
  getAllProductionDetails,
  getProductionDetailById,
  getProductionDetails,
  recoverProductionDetail,
  updateProductionDetail,
} from "../controllers/production_detail.controller";

const router = Router();

// Routes
router.post("/", createProductionDetail);
router.put("/:id", updateProductionDetail);
router.get("/", getProductionDetails);
router.get("/all", getAllProductionDetails);

router.get("/:id", getProductionDetailById);
router.delete("/:id", deleteProductionDetail);
router.patch("/:id", recoverProductionDetail );
export default router;