import { Router } from "express";
import {
  createProcess,
  deleteProcess,
  getAllProcesses,
  getProcessById,
  updateProcess,
} from "../controllers/process.controller";

const router = Router();

// Routes
router.post("/", createProcess);
router.put("/:id", updateProcess);
router.get("/", getAllProcesses);
router.get("/:id", getProcessById);
router.delete("/:id", deleteProcess);

export default router;