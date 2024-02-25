import path from "path";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";

//port
const port = process.env.PORT || 5000;

// connection to the database
connectDB();

const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.listen(port, () => console.log(`Server started on port ${port}`));
