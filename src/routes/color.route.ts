import { Router } from "express";
import {
  createColor,
  deleteColor,
  getColors,
  getColorById,
  updateColor,
  getAllColors, 
  recoverColor,
} from "../controllers/color.controller";

const router = Router();

// Routes
router.post("/", createColor);
router.put("/:id", updateColor);
router.get("/", getColors);
router.get("/all", getAllColors);
router.get("/:id", getColorById);
router.delete("/:id", deleteColor);
router.patch("/:id", recoverColor);

export default router;