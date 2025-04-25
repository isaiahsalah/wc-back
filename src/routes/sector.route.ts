import { Router } from "express";
import {
  createSector,
  deleteSector,
  getAllSectors,
  getSectorById,
  updateSector,
} from "../controllers/sector.controller";

const router = Router();

// Routes
router.post("/", createSector);
router.put("/:id", updateSector);
router.get("/", getAllSectors);
router.get("/all", getAllSectors);
router.get("/:id", getSectorById);
router.delete("/:id", deleteSector);

export default router;