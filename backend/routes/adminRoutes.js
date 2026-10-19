import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";

import { getDashboard } from "../controllers/adminController.js";

const router = express.Router();

router.get("/", authMiddleware, adminMiddleware, getDashboard);

export default router;
