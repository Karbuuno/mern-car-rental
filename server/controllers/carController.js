import asyncHandler from "../middleware/asyncHandler.js";
import Cars from "../models/CarModel.js";

const getCars = asyncHandler(async (req, res) => {
  try {
    const cars = await Cars.find({});
    res.json({ cars });
  } catch (error) {
    res.status(404);
    throw new Error("Product not found");
  }
});

export { getCars };
