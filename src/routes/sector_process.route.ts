import {Router} from "express";
import {
  createSectorProcess,
  deleteSectorProcess,
  getSectorProcessById,
  getSectorProcesses,
  recoverSectorProcess,
  updateSectorProcess,
} from "../controllers/sector_process.controller";

const router = Router();

// Routes
router.post("/", createSectorProcess);
router.put("/:id", updateSectorProcess);
router.get("/", getSectorProcesses);
router.get("/:id", getSectorProcessById);
router.delete("/:id", deleteSectorProcess);
router.patch("/:id", recoverSectorProcess);
export default router;
