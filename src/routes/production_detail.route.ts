import { Router } from "express";
import {
  createProductionDetail,
  deleteProductionDetail,
  getAllProductionDetails,
  getProductionDetailById,
  updateProductionDetail,
} from "../controllers/production_detail.controller";

const router = Router();

// Routes
router.post("/", createProductionDetail);
router.put("/:id", updateProductionDetail);
router.get("/", getAllProductionDetails);
router.get("/all", getAllProductionDetails);

router.get("/:id", getProductionDetailById);
router.delete("/:id", deleteProductionDetail);

export default router;