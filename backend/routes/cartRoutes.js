import express from "express";

import {
  addToCart,
  getCart,
  updateCart,
  removeCart,
} from "../controllers/cartController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, addToCart);
router.get("/", authMiddleware, getCart);
router.put("/:id", authMiddleware, updateCart);
router.delete("/:id", authMiddleware, removeCart);

export default router;
