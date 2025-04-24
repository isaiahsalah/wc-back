import { Router } from "express";
import {
  createPermission,
  deletePermission,
  getAllPermissions,
  getPermissionById,
  updatePermission,
} from "../controllers/permission.controller";

const router = Router();

// Routes
router.post("/", createPermission);
router.put("/:id", updatePermission);
router.get("/", getAllPermissions);
router.get("/:id", getPermissionById);
router.delete("/:id", deletePermission);

export default router;