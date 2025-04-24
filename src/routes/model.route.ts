import { Router } from "express";
import {
  createModel,
  deleteModel,
  getAllModels,
  getModelById,
  updateModel,
} from "../controllers/model.controller";

const router = Router();

// Routes
router.post("/", createModel);
router.put("/:id", updateModel);
router.get("/", getAllModels);
router.get("/:id", getModelById);
router.delete("/:id", deleteModel);

export default router;