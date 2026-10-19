import express from "express";

import {
  addHookah,
  getHookahs,
  getHookah,
  updateHookah,
  deleteHookah,
} from "../controllers/hookahController.js";

const router = express.Router();

router.post("/", addHookah);
router.get("/", getHookahs);
router.get("/:id", getHookah);
router.put("/:id", updateHookah);
router.delete("/:id", deleteHookah);

export default router;
