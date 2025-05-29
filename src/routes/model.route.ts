import {Router} from "express";
import {
  createProductModel,
  getProductModelById,
  getProductModels,
  hardDeleteProductModel,
  recoverProductModel,
  softDeleteProductModel,
  updateProductModel,
} from "../controllers/model.controller";

const router = Router();

// Routes
router.post("/", createProductModel);
router.put("/:id", updateProductModel);
router.get("/", getProductModels);
router.get("/:id", getProductModelById);
router.delete("/soft/:id", softDeleteProductModel);
router.delete("/hard/:id", hardDeleteProductModel);
router.patch("/:id", recoverProductModel);
export default router;
