import {Router} from "express";
import {updatePassword, updateProfile} from "../controllers/profile.controller";

const router = Router();

// Routes
router.put("/:id", updateProfile);
router.put("/pass/:id", updatePassword);

export default router;
