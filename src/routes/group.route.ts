import {Router} from "express";
import {
  createWorkGroup,
  updateWorkGroup,
  getWorkGroups,
  recoverWorkGroup,
  getWorkGroupById,
  softDeleteWorkGroup,
  hardDeleteWorkGroup,
} from "../controllers/group.controller";

const router = Router();

// Rutas
router.post("/", createWorkGroup);
router.put("/:id", updateWorkGroup);
router.get("/", getWorkGroups);
router.get("/:id", getWorkGroupById);
router.delete("/soft/:id", softDeleteWorkGroup);
router.delete("/hard/:id", hardDeleteWorkGroup);
router.patch("/:id", recoverWorkGroup);

export default router;
