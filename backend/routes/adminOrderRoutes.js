import express from "express";

import {
  getAllOrders,
  getSingleOrder,
  updateOrderStatus,
  deleteOrder,
} from "../controllers/adminOrderController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, adminMiddleware, getAllOrders);
router.get("/:id", authMiddleware, adminMiddleware, getSingleOrder);
router.put("/:id/status", authMiddleware, adminMiddleware, updateOrderStatus);
router.delete("/:id", authMiddleware, adminMiddleware, deleteOrder);

export default router;
