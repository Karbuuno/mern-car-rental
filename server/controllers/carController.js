import asyncHandler from "../middleware/asyncHandler.js";
import Car from "../models/CarModel.js";

const getCars = asyncHandler(async (req, res) => {
  try {
    const cars = await Car.find({});
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

  if (search !== "") {
    try {
      const searchedCar = await Car.find(search);
      res.json({ length: searchedCar.length, searchedCar });
    } catch (error) {
      res.status(404);
      throw new Error("Resource not found");
    }
  }
});

const getCar = asyncHandler(async (req, res) => {
  const car = await Car.findById(req.params.id).select([
    "-__v",
    "-createdAt",
    "-updatedAt",
  ]);
  try {
    res.json({ car });
  } catch (error) {
    res.status(404);
    throw new Error("Car not found");
  }
});

const registerCar = asyncHandler(async (req, res) => {
  const {
    name,
    regNumber,
    seats,
    doors,
    image,
    carType,
    gear,
    description,
    location,
    fuel,
    model,
    rating,
    price,
  } = req.body;

  const carExists = await Car.findOne({ regNumber });

  if (carExists) {
    res.status(400);
    throw new Error("Car already exists");
  } else {
  }

  const car = await Car.create({
    name,
    regNumber,
    seats,
    doors,
    image,
    carType,
    gear,
    description,
    location,
    fuel,
    model,
    rating,
    price,
  });
  if (car) {
    res.status(201).json(car);
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
});

export { getCars, getCar, searchCars, registerCar };
