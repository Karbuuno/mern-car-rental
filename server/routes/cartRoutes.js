import express from "express";
const router = express.Router();
import {
  getCar,
  getCars,
  searchCars,
  registerCar,
  deletePCar,
  updateCar,
} from "../controllers/carController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";
import { availableCar } from "../controllers/bookingController.js";

router
  .route("/")
  .get(getCars)
  .post(protect, admin, upload.single("image"), registerCar);
router
  .route("/:id")
  .get(getCar)
  .delete(deletePCar)
  .put(protect, admin, upload.single("image"), updateCar);
router.route("/search/:location").get(searchCars);
router.route("/available/:id").put(availableCar);

export default router;
