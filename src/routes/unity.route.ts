import {Router} from "express";
import {
  createUnit,
  getUnitById,
  getUnits,
  hardDeleteUnit,
  recoverUnit,
  softDeleteUnit,
  updateUnit,
} from "../controllers/unity.controller";

const router = Router();

// Routes
router.post("/", createUnit);
router.put("/:id", updateUnit);
router.get("/", getUnits);
router.get("/:id", getUnitById);
router.delete("/soft/:id", softDeleteUnit);
router.delete("/hard/:id", hardDeleteUnit);
router.patch("/:id", recoverUnit);
export default router;
