import {Router} from "express";
import {
  createPermission,
  deletePermission,
  getPermissionById,
  getPermissions,
  recoverPermission,
  updatePermission,
} from "../controllers/permission.controller";

const router = Router();

// Routes
router.post("/", createPermission);
router.put("/:id", updatePermission);
router.get("/", getPermissions);
router.get("/:id", getPermissionById);
router.delete("/:id", deletePermission);
router.patch("/:id", recoverPermission);
export default router;
