import express from "express";
const router = express.Router();

import {
  allBooking,
  deleteBooking,
  getMyBooking,
} from "../controllers/bookingController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

router.route("/myBookings").get(protect, getMyBooking);
router.route("/allBookings").get(protect, admin, allBooking);
router.route("/delete-booking/:id").delete(protect, deleteBooking);
export default router;
