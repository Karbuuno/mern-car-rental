import asyncHandler from "../middleware/asyncHandler.js";
import Car from "../models/CarModel.js";
import cloudinary from "../config/clodinary.js";

const getCars = asyncHandler(async (req, res) => {
  try {
    const cars = await Car.find({}).sort("-createdAt");
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

  let result;

  if (req.file) {
    let encodedImage = `data:image/jpeg;base64,${req.file.buffer.toString(
      "base64"
    )}`;

    result = await cloudinary.uploader.upload(encodedImage, {
      resource_type: "image",
      transformation: [{ width: 500, height: 500, crop: "limit" }],
      encoding: "base64",
    });
  }
  const car = await Car.create({
    name,
    regNumber,
    seats,
    doors,
    image: result?.url || null,
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

// update Car
const updateCar = asyncHandler(async (req, res) => {
  try {
    let updatedFields = {
      name: req.body.name,
      regNumber: req.body.regNumber,
      seats: req.body.seats,
      doors: req.body.doors,
      carType: req.body.carType,
      gear: req.body.gear,
      description: req.body.description,
      location: req.body.location,
      fuel: req.body.fuel,
      model: req.body.model,
      price: req.body.price,
    };

    if (req.file) {
      let encodedImage = `data:image/jpeg;base64,${req.file.buffer.toString(
        "base64"
      )}`;
      const result = await cloudinary.uploader.upload(encodedImage, {
        resource_type: "image",
        transformation: [{ width: 500, height: 500, crop: "limit" }],
        encoding: "base64",
      });
      updatedFields.image = result.url;
    }

    const car = await Car.findByIdAndUpdate(req.params.id, updatedFields, {
      new: true,
    });
    const updatedCar = await car.save();
    res.json(updatedCar);
  } catch (error) {
    console.log(error);
    res.status(404);
    throw new Error("Car not found");
  }

  // const {
  //   name,
  //   regNumber,
  //   seats,
  //   doors,
  //   image,
  //   carType,
  //   gear,
  //   description,
  //   location,
  //   fuel,
  //   model,
  //   price,
  // } = req.body;

  // const car = await Car.findById(req.params.id);

  // if (car) {
  //   car.name = name;
  //   car.price = price;
  //   car.description = description;
  //   car.image = image;
  //   car.carType = carType;
  //   car.model = model;
  //   car.fuel = fuel;
  //   car.regNumber = regNumber;
  //   car.seats = seats;
  //   car.location = location;
  //   car.gear = gear;
  //   car.doors = doors;

  //   const updatedCar = await car.save();
  //   res.json(updatedCar);
  // } else {
  //   res.status(404);
  //   throw new Error("Car not found");
  // }
});

// Delete car

const deletePCar = asyncHandler(async (req, res) => {
  const car = await Car.findById(req.params.id);

  if (car) {
    await Car.deleteOne({ _id: car._id });
    res.json({ message: "Car removed" });
  } else {
    res.status(404);
    throw new Error("car not found");
  }
});

export { getCars, getCar, searchCars, registerCar, deletePCar, updateCar };
