import { Router } from "express";
import {
  createLote,
  deleteLote,
  getAllLotes,
  getLoteById,
  recoverLote,
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
router.patch("/:id", recoverLote );
export default router;