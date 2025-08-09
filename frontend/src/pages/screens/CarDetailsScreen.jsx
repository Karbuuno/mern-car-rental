import React from "react";
import { GiCarDoor, GiGearStickPattern } from "react-icons/gi";
import { carDetails, checkout } from "@/components/api/api";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { UseContext } from "@/components/context/AuthContext";
import { FaSuitcase, FaUser } from "react-icons/fa";
import { IoMdLocate, IoMdSpeedometer } from "react-icons/io";

function CarDetailsScreen() {
  const { search } = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const searchParams = new URLSearchParams(search);
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const totalDays = Number(searchParams.get("totalDays")) || 1;

  const { user } = UseContext();
  const { id } = useParams();

  const { data, error, isLoading } = useQuery({
    queryKey: ["cars", id],
    queryFn: () => carDetails(id),
  });

  const stripeMutation = useMutation({
    mutationFn: checkout,
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ["checkout"] });
      console.log("Checkout success:", data);
      // Optionally redirect user after successful booking
      // navigate("/some-success-page");
    },
  });

  const handlePayment = e => {
    e.preventDefault();
    if (!user) {
      navigate("/login");
      return;
    }
    stripeMutation.mutate({
      totalPrice: Math.floor(data?.car?.price * totalDays),
      userId: user._id,
      carId: data?.car?._id,
      image: data?.car?.image,
      make: data?.car?.name,
      regNumber: data?.car?.regNumber,
      isAvailable: data?.car?.isAvailable,
      startDate: from,
      endDate: to,
      totalDays,
    });
  };

  if (isLoading)
    return <p className='text-center mt-10'>Loading car details...</p>;
  if (error)
    return (
      <p className='text-center mt-10 text-red-500'>
        Failed to load car details.
      </p>
    );
  if (!data?.car) return <p className='text-center mt-10'>Car not found.</p>;

  const car = data.car;

  return (
    <div className='max-w-5xl mx-auto px-6 py-12 pt-20'>
      <Link
        to='/'
        className='inline-block bg-gray-600 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded mb-8'
      >
        &larr; Go Back
      </Link>

      <div className='bg-white shadow-xl rounded-lg overflow-hidden'>
        <div className='flex flex-col lg:flex-row'>
          {/* Image */}
          <div className='lg:w-1/2 flex justify-center items-center bg-gray-100 p-6'>
            <img
              src={car.image}
              alt={`${car.name} ${car.model}`}
              className='object-contain max-h-96 rounded-md'
            />
          </div>

          {/* Details */}
          <div className='lg:w-1/2 p-8 flex flex-col justify-between'>
            <div>
              <h1 className='text-3xl font-bold uppercase mb-6'>
                {car.name} {car.model}
              </h1>

              <div className='grid grid-cols-2 gap-6 text-gray-700'>
                <div>
                  <div className='flex items-center gap-2 mb-3'>
                    <FaUser className='text-xl text-blue-600' />
                    <span>Seats: {car.seats}</span>
                  </div>
                  <div className='flex items-center gap-2 mb-3'>
                    <GiCarDoor className='text-xl text-blue-600' />
                    <span>Doors: {car.doors}</span>
                  </div>
                  <div className='flex items-center gap-2 mb-3'>
                    <IoMdSpeedometer className='text-xl text-blue-600' />
                    <span>Type: {car.type}</span>
                  </div>
                </div>
                <div>
                  <div className='flex items-center gap-2 mb-3'>
                    <FaSuitcase className='text-xl text-blue-600' />
                    <span>Fuel: {car.fuel}</span>
                  </div>
                  <div className='flex items-center gap-2 mb-3'>
                    <GiGearStickPattern className='text-xl text-blue-600' />
                    <span>Gear: {car.gear}</span>
                  </div>
                  <div className='flex items-center gap-2 mb-3'>
                    <IoMdLocate className='text-xl text-blue-600' />
                    <span>Location: {car.location} Airport</span>
                  </div>
                </div>
              </div>
            </div>

            <div className='mt-8 border-t pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6'>
              <div>
                <p className='text-gray-600'>
                  Price for <span className='font-semibold'>{totalDays}</span>{" "}
                  day
                  {totalDays > 1 ? "s" : ""}:
                </p>
                <p className='text-2xl font-bold text-green-600'>
                  ${Math.floor(car.price * totalDays)}
                </p>
                <p className='text-sm text-gray-500 mt-1'>Fee Cancellation</p>
              </div>

              <button
                onClick={handlePayment}
                disabled={!car.isAvailable || stripeMutation.isLoading}
                className={`w-full sm:w-auto px-8 py-3 rounded text-white font-semibold transition ${
                  !car.isAvailable
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {stripeMutation.isLoading ? "Processing..." : "Book Now"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarDetailsScreen;
