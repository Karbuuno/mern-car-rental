import path from "path";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import carRouts from "./routes/cartRoutes.js";
//port
const port = process.env.PORT || 5000;

// connection to the database
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/users", userRoutes);
app.use("/api/cars", carRouts);
app.use("/api/cars", carRouts);
app.listen(port, () => console.log(`Server started on port ${port}`));
