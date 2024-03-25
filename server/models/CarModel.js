import mongoose from "mongoose";

const carSchema = mongoose.Schema(
  {
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: "User",
    // },
    name: {
      type: String,
      required: true,
    },
    regNumber: {
      type: String,
      required: true,
    },
    seats: {
      type: Number,
      required: true,
    },
    doors: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    carType: {
      type: String,
    },
    gear: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    fuel: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },

    isAvailable: {
      type: String,
      required: true,
      default: false,
    },

    price: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Car = mongoose.model("Car", carSchema);

export default Car;
