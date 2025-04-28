import { Router } from "express";
import {
  createUnity,
  deleteUnity,
  getAllUnities,
  getUnities,
  getUnityById,
  recoverUnity,
  updateUnity,
} from "../controllers/unity.controller";

const router = Router();

// Routes
router.post("/", createUnity);
router.put("/:id", updateUnity);
router.get("/", getUnities);
router.get("/all", getAllUnities);
router.get("/:id", getUnityById);
router.delete("/:id", deleteUnity);
router.patch("/:id", recoverUnity );
export default router;