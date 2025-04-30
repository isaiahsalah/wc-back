import {Router} from "express";
import {updateProfile} from "../controllers/profile.controller";

const router = Router();

// Routes
router.put("/:id", updateProfile);
export default router;
