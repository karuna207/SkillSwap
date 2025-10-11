import express from "express";
import {
  createSwapRequest,
  respondToSwap,
  finalizeSwap,
  getMySwaps
} from "../controllers/swapController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createSwapRequest);
router.put("/:swapId/respond", protect, respondToSwap);
router.put("/:swapId/finalize", protect, finalizeSwap);
router.get("/my-swaps", protect, getMySwaps);

export default router;
