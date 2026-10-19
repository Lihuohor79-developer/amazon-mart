import express from "express";

import {
  placeOrder,
  myOrders,
  getOrder,
  updateOrder,
  deleteOrder,
} from "../controllers/orderController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/place", authMiddleware, placeOrder);
router.get("/my-orders", authMiddleware, myOrders);
router.get("/:id", authMiddleware, getOrder);
router.put("/:id", authMiddleware, updateOrder);
router.delete("/:id", authMiddleware, deleteOrder);

export default router;
