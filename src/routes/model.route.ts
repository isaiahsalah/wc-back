import { Router } from "express";
import {
  createModel,
  deleteModel,
  getAllModels,
  getModelById,
  getModels,
  recoverModel,
  updateModel,
} from "../controllers/model.controller";

const router = Router();

// Routes
router.post("/", createModel);
router.put("/:id", updateModel);
router.get("/", getModels);
router.get("/all", getAllModels);
router.get("/:id", getModelById);
router.delete("/:id", deleteModel);
router.patch("/:id", recoverModel );
export default router;