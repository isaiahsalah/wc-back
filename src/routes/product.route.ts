import {Router} from "express";
import {
  createProduct,
  getProductById,
  getProducts,
  hardDeleteProduct,
  recoverProduct,
  softDeleteProduct,
  updateProduct,
} from "../controllers/product.controller";

const router = Router();

// Routes
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.delete("/soft/:id", softDeleteProduct);
router.delete("/hard/:id", hardDeleteProduct);
router.patch("/:id", recoverProduct);
export default router;
