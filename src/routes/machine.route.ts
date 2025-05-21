import {Router} from "express";
import {
  createMachine,
  deleteMachine,
  getMachineById,
  getMachines,
  recoverMachine,
  updateMachine,
} from "../controllers/machine.controller";

const router = Router();

// Routes
router.post("/", createMachine);
router.put("/:id", updateMachine);
router.get("/", getMachines);
router.get("/:id", getMachineById);
router.delete("/:id", deleteMachine);
router.patch("/:id", recoverMachine);
export default router;
