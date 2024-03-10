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
const searchCars = asyncHandler(async (req, res) => {
  // const search = new RegExp(req.params?.location, "i");
  const search = req.params?.location
    ? {
        location: {
          $regex: req.params?.location,
          $options: "i",
        },
      }
    : {};
  console.log(search);
  if (search !== "") {
    try {
      const searchedCar = await Cars.find(search);
      res.json({ length: searchedCar.length, searchedCar });
    } catch (error) {
      res.status(404);
      throw new Error("Resource not found");
    }
  }
});

export { getCars, searchCars };
