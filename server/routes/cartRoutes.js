import express from "express";
const router = express.Router();
import { getCar, getCars, searchCars } from "../controllers/carController.js";

router.route("/").get(getCars);
router.route("/:id").get(getCar);
router.route("/search/:location").get(searchCars);

export default router;
