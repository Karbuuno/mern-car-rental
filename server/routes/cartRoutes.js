import express from "express";
const router = express.Router();
import { getCars, searchCars } from "../controllers/carController.js";

router.route("/").get(getCars);
router.route("/:location").get(searchCars);

export default router;
