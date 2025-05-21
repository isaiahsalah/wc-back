import {Router} from "express";
import {
  createGroup,
  deleteGroup,
  getGroups,
  getGroupById,
  updateGroup,
  recoverGroup,
} from "../controllers/group.controller";

const router = Router();

// Rutas
router.post("/", createGroup);
router.put("/:id", updateGroup);
router.get("/", getGroups);
router.get("/:id", getGroupById);
router.delete("/:id", deleteGroup);
router.patch("/:id", recoverGroup);

export default router;
