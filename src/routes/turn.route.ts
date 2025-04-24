import { Router } from "express";
import {
  createTurn,
  deleteTurn,
  getAllTurns,
  getTurnById,
  updateTurn,
} from "../controllers/turn.controller";

const router = Router();

// Routes
router.post("/", createTurn);
router.put("/:id", updateTurn);
router.get("/", getAllTurns);
router.get("/:id", getTurnById);
router.delete("/:id", deleteTurn);

export default router;