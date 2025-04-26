import { Router } from "express";
import {
  createPermission,
  deletePermission,
  getAllPermissions,
  getPermissionById,
  recoverPermission,
  updatePermission,
} from "../controllers/permission.controller";

const router = Router();

// Routes
router.post("/", createPermission);
router.put("/:id", updatePermission);
router.get("/", getAllPermissions);
router.get("/all", getAllPermissions);
router.get("/:id", getPermissionById);
router.delete("/:id", deletePermission);
router.patch("/:id", recoverPermission );
export default router;