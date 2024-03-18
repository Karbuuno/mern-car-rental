import express from "express";
const router = express.Router();
import { createPayment } from "../controllers/stripeController.js";
import { protect } from "../middleware/authMiddleware.js";

router.post("/create-checkout", protect, createPayment);
export default router;
