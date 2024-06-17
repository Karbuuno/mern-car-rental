import express from "express";
const router = express.Router();

import { allBooking, getMyBooking } from "../controllers/bookingController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

router.route("/myBookings").get(protect, getMyBooking);
router.route("/allBookings").get(protect, admin, allBooking);
export default router;
