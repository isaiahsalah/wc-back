import {Router} from "express";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  recoverUser,
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
router.delete("/:id", deleteUser);
router.patch("/:id", recoverUser);
export default router;
