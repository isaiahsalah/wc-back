import { Router } from "express";
import { getExample } from "../controllers/example.controller";

const router = Router();

// Routes
router.get("/avancedOrder", getExample);

export default router;