import { Router } from "express";
import {
  createLote,
  deleteLote,
  getAllLotes,
  getLoteById,
  updateLote,
} from "../controllers/lote.controller";

const router = Router();

// Routes
router.post("/", createLote);
router.put("/:id", updateLote);
router.get("/", getAllLotes);
router.get("/all", getAllLotes);
router.get("/:id", getLoteById);
router.delete("/:id", deleteLote);

export default router;