// import asyncHandler from "../middleware/asyncHandler.js";
import dotenv from "dotenv";
dotenv.config();
import Stripe from "stripe";
const stripe = Stripe(process.env.STRIPE_KEY);
import Bookings from "../models/BookingModel.js";
import Car from "../models/CarModel.js";
const createPayment = async (req, res) => {
  try {
    const {
      totalPrice,
      make,
      image,
      regNumber,
      isAvailable,
      userId,
      carId,
      startDate,
      endDate,
    } = req.body;

    const booked = Car.findByIdAndUpdate(
      carId,
      { isAvailable: false },
      { new: true }
    );
    const session = await stripe.checkout.sessions.create({
      //   metadata: {
      //     user: req.user.userId,
      //     totalPrice,
      //     make,
      //   },
      // metadata: {
      //   bookingData: JSON.stringify({
      //     user: req.user.userId,
      //     totalPrice,
      //     make,
      //     startDate,
      //     endDate,
      //     image,
      //   }),
      // },
      line_items: [
        {
          price_data: {
            currency: "USD",
            product_data: {
              name: make,
              images: [image],
            },
            unit_amount: totalPrice * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/checkout_session`,
      cancel_url: `${process.env.CLIENT_URL}/`,
    });
    res.send({ url: session.url });

    if (session.url) {
      console.log(isAvailable);
      const booking = await Bookings.create({
        user: userId,
        car: carId,
        make,
        regNumber,
        startDate,
        endDate,
        isAvailable: booked.isAvailable,
        totalPrice,
      });
    }
  } catch (error) {
    console.log("error at stripe", error);
    res.status(400);
    throw new Error("Payment failed");
  }
};
export { createPayment };
