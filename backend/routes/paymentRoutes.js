import express from "express";
import {
  createCheckoutSession,
  verifyPayment,
} from "../controllers/paymentController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create-session", authMiddleware, createCheckoutSession);
router.post("/verify-payment", authMiddleware, verifyPayment);

export default router;
