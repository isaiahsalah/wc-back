import {Router} from "express";
import {
  createColor,
  getColors,
  getColorById,
  updateColor,
  recoverColor,
  softDeleteColor,
  hardDeleteColor,
} from "../controllers/color.controller";

const router = Router();

// Routes
router.post("/", createColor);
router.put("/:id", updateColor);
router.get("/", getColors);
router.get("/:id", getColorById);
router.delete("/soft/:id", softDeleteColor); // Soft delete
router.delete("/hard/:id", hardDeleteColor); // Hard delete
router.patch("/:id", recoverColor);

export default router;
