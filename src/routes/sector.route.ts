import {Router} from "express";
import {
  createSector,
  deleteSector,
  getSectorById,
  getSectors,
  recoverSector,
  updateSector,
} from "../controllers/sector.controller";

const router = Router();

// Routes
router.post("/", createSector);
router.put("/:id", updateSector);
router.get("/", getSectors);
router.get("/:id", getSectorById);
router.delete("/:id", deleteSector);
router.patch("/:id", recoverSector);
export default router;
