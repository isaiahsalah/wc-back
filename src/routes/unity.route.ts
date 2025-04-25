import { Router } from "express";
import {
  createUnity,
  deleteUnity,
  getAllUnities,
  getUnityById,
  updateUnity,
} from "../controllers/unity.controller";

const router = Router();

// Routes
router.post("/", createUnity);
router.put("/:id", updateUnity);
router.get("/", getAllUnities);
router.get("/all", getAllUnities);
router.get("/:id", getUnityById);
router.delete("/:id", deleteUnity);

export default router;