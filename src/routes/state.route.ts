import { Router } from "express";
import {
  createState,
  deleteState,
  getAllStates,
  getStateById,
  updateState,
} from "../controllers/state.controller";

const router = Router();

// Routes
router.post("/", createState);
router.put("/:id", updateState);
router.get("/", getAllStates);
router.get("/:id", getStateById);
router.delete("/:id", deleteState);

export default router;