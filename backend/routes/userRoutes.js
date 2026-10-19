import express from "express";
import {
  registerUser,
  verifyEmail,
  resendOtp,
  loginUser,
  forgotPassword,
  resetPassword,
  getProfile,
} from "../controllers/userController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/verify-email", verifyEmail);
router.post("/resend-otp", resendOtp);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

router.get("/profile", authMiddleware, getProfile);

export default router;
