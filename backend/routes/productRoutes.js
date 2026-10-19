import express from "express";
import {
  addProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", authMiddleware, addProduct);
router.get("/", getProducts);
router.get("/:id", getProduct);
router.put("/:id", authMiddleware, updateProduct);
router.delete("/:id", authMiddleware, deleteProduct);

export default router;
