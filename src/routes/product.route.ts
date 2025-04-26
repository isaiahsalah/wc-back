import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  recoverProduct,
  updateProduct,
} from "../controllers/product.controller";

const router = Router();

// Routes
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.get("/", getAllProducts);
router.get("/all", getAllProducts);
router.get("/:id", getProductById);
router.delete("/:id", deleteProduct);
router.patch("/:id", recoverProduct );
export default router;