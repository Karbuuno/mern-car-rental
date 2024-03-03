import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import carData from "../data/cars.js";
import Cars from "../models/CarModel.js";
import connectDB from "../config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Cars.insertMany(carData);

    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Cars.deleteMany();
    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
