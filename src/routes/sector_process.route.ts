import {Router} from "express";
import {
  createSectorProcess,
  getSectorProcessById,
  getSectorProcesses,
  hardDeleteSectorProcess,
  recoverSectorProcess,
  softDeleteSectorProcess,
  updateSectorProcess,
} from "../controllers/sector_process.controller";

const router = Router();

// Routes
router.post("/", createSectorProcess);
router.put("/:id", updateSectorProcess);
router.get("/", getSectorProcesses);
router.get("/:id", getSectorProcessById);
router.delete("/soft/:id", softDeleteSectorProcess);
router.delete("/hard/:id", hardDeleteSectorProcess);
router.patch("/:id", recoverSectorProcess);
export default router;
