import express from "express";
const router = express.Router();
import { getCars } from "../controllers/carController.js";

router.route("/").get(getCars);

export default router;
