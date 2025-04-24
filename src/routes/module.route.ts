import { Router } from "express";
import {
  createModule,
  deleteModule,
  getAllModules,
  getModuleById,
  updateModule,
} from "../controllers/module.controller";

const router = Router();

// Routes
router.post("/", createModule);
router.put("/:id", updateModule);
router.get("/", getAllModules);
router.get("/:id", getModuleById);
router.delete("/:id", deleteModule);

export default router;