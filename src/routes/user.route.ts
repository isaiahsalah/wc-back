import {Router} from "express";
import {
  createUser,
  getUserById,
  getUsers,
  hardDeleteSysUser,
  recoverUser,
  softDeleteSysUser,
  updateUser,
  updateUserPermissions,
} from "../controllers/user.controller";

const router = Router();

// Routes
router.post("/", createUser);
router.put("/:id", updateUser);
router.put("/permission/:id", updateUserPermissions);

router.get("/", getUsers);
router.get("/:id", getUserById);
router.delete("/soft/:id", softDeleteSysUser);
router.delete("/hard/:id", hardDeleteSysUser);
router.patch("/:id", recoverUser);
export default router;
