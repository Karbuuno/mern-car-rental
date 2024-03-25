import express from "express";
const router = express.Router();
import {
  getCar,
  getCars,
  searchCars,
  registerCar,
} from "../controllers/carController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(getCars).post(protect, admin, registerCar);
router.route("/:id").get(getCar);
router.route("/search/:location").get(searchCars);

export default router;
