import { Router } from "express";
import {
  createMachine,
  deleteMachine,
  getAllMachines,
  getMachineById,
  recoverMachine,
  updateMachine,
} from "../controllers/machine.controller";

const router = Router();

// Routes
router.post("/", createMachine);
router.put("/:id", updateMachine);
router.get("/", getAllMachines);
router.get("/all", getAllMachines);
router.get("/:id", getMachineById);
router.delete("/:id", deleteMachine);
router.patch("/:id", recoverMachine );
export default router;