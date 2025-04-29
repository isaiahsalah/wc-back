import { Router } from "express";
import { postLogin,getCheckToken } from "../controllers/auth.controller";

const router = Router();

// Routes
router.post("/login", postLogin);
router.get("/token", getCheckToken);
export default router;