import asyncHandler from "../middleware/asyncHandler.js";
import Bookings from "../models/BookingModel.js";
import Car from "../models/CarModel.js";

const getMyBooking = asyncHandler(async (req, res) => {
  const myBookings = await Bookings.find({ user: req.user._id }).sort(
    "-createdAt"
  );
  res.json(myBookings);
});
const allBooking = asyncHandler(async (req, res) => {
  const bookings = await Bookings.find({}).sort("-createdAt");
  res.json({ length: bookings.length, bookings });
});

const availableCar = asyncHandler(async (req, res) => {
  try {
    // let { isAvailable } = req.body;
    let updatedFields = {
      isAvailable: req.body.isAvailable,
    };
    const car = await Car.findByIdAndUpdate(req.params.id, updatedFields, {
      new: true,
    });
    if (!car) return res.status(400).send("Car Not Found");
    const available = await car.save();
    res.json(available);
  } catch (error) {
    console.log(error);
    res.status(404);
    throw new Error("Car not found");
  }
});

export { getMyBooking, allBooking, availableCar };
