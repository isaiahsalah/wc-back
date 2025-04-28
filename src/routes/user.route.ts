import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  getUsers,
  recoverUser,
  updateUser,
} from "../controllers/user.controller";

const router = Router();

// Routes
router.post("/", createUser);
router.put("/:id", updateUser);
router.get("/", getUsers);
router.get("/all", getAllUsers);
router.get("/:id", getUserById);
router.delete("/:id", deleteUser);
router.patch("/:id", recoverUser );
export default router;