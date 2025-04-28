import { Router } from "express";
import {
  createProcess,
  deleteProcess,
  getAllProcesses,
  getProcessById,
  getProcesses,
  recoverProcess,
  updateProcess,
} from "../controllers/process.controller";

const router = Router();

// Routes
router.post("/", createProcess);
router.put("/:id", updateProcess);
router.get("/", getProcesses);
router.get("/all", getAllProcesses);
router.get("/:id", getProcessById);
router.delete("/:id", deleteProcess);
router.patch("/:id", recoverProcess );
export default router;