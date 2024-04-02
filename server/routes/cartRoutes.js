import express from "express";
const router = express.Router();
import {
  getCar,
  getCars,
  searchCars,
  registerCar,
} from "../controllers/carController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

router
  .route("/")
  .get(getCars)
  .post(protect, admin, upload.single("image"), registerCar);
router.route("/:id").get(getCar);
router.route("/search/:location").get(searchCars);

export default router;
