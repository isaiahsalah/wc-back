import {Router} from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  recoverProduct,
  updateProduct,
} from "../controllers/product.controller";

const router = Router();

// Routes
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.delete("/:id", deleteProduct);
router.patch("/:id", recoverProduct);
export default router;
