import {Router} from "express";
import {
  createPermission,
  getPermissionById,
  getPermissions,
  hardDeletePermission,
  recoverPermission,
  softDeletePermission,
  updatePermission,
} from "../controllers/permission.controller";

const router = Router();

// Routes
router.post("/", createPermission);
router.put("/:id", updatePermission);
router.get("/", getPermissions);
router.get("/:id", getPermissionById);
router.delete("/soft/:id", softDeletePermission);
router.delete("/hard/:id", hardDeletePermission);
router.patch("/:id", recoverPermission);
export default router;
