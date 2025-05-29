import {Router} from "express";
import {
  createMachine,
  getMachineById,
  getMachines,
  hardDeleteMachine,
  recoverMachine,
  softDeleteMachine,
  updateMachine,
} from "../controllers/machine.controller";

const router = Router();

// Routes
router.post("/", createMachine);
router.put("/:id", updateMachine);
router.get("/", getMachines);
router.get("/:id", getMachineById);
router.delete("/soft/:id", softDeleteMachine);
router.delete("/hard/:id", hardDeleteMachine);
router.patch("/:id", recoverMachine);
export default router;
