import React from "react";
import { GiCarDoor, GiGearStickPattern } from "react-icons/gi";
import { useQuery } from "react-query";
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { SearchCarsData } from "@/components/api/api";
import { dayDifference } from "@/components/api/daysDiff";
import { FaSuitcase, FaUser } from "react-icons/fa";
import { IoMdLocate, IoMdSpeedometer } from "react-icons/io";
import { UseContext } from "@/components/context/AuthContext"; // adjust import path if needed

function Location() {
  const { user } = UseContext(); // get logged-in user from context
  const { location } = useParams();
  const navigate = useNavigate();
  const { search } = useLocation();

  const searchParams = new URLSearchParams(search);
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const totalDays = dayDifference(from, to);

  const { data, error, isLoading } = useQuery({
    queryKey: ["search", location],
    queryFn: () => SearchCarsData(location),
  });

  if (isLoading) return <h3>...loading</h3>;
  if (error) return <h3>Data not found</h3>;
  if (!data || !data.searchedCar || data.searchedCar.length === 0) {
    return (
      <div className='flex items-center justify-center h-[50vh]'>
        <h3 className='text-2xl font-semibold text-gray-500'>
          City "<span className='text-red-500'>{location}</span>" not found
        </h3>
      </div>
    );
  }

  return (
    <div className='flex justify-between flex-wrap gap-x-4 gap-y-12 mt-20 px-3 md:px-5 lg:px-8 xl:px-16'>
      {data.searchedCar.map(car => (
        <div
          className='flex flex-col flex-grow gap-2 shadow-2xl bg-white rounded-md ms:w-full md:w-full lg:w-[45%]'
          key={car._id}
        >
          <div className='flex justify-between px-4 w-full h-80'>
            {/* Image */}
            <div className='flex items-center px-3'>
              <img src={car.image} alt={car.name} className='max-h-full' />
            </div>

            {/* Details */}
            <div className='mt-8 px-4 flex flex-col justify-between'>
              <h2 className='font-bold uppercase'>
                {car.name} {car.model}
              </h2>

              <div className='flex justify-between gap-8 flex-wrap mt-8'>
                <div className='flex flex-col gap-4'>
                  <div className='flex items-center gap-2 text-gray-500'>
                    <FaUser className='mt-1' />
                    <span>Seats: {car.seats}</span>
                  </div>
                  <div className='flex items-center gap-2 text-gray-500'>
                    <GiCarDoor className='mt-1' />
                    <span>Doors: {car.doors}</span>
                  </div>
                  <div className='flex items-center gap-2 text-gray-500'>
                    <IoMdSpeedometer className='mt-1' />
                    <span>Limited Mileage</span>
                  </div>
                </div>

                <div className='flex flex-col gap-4'>
                  <div className='flex items-center gap-2 text-gray-500'>
                    <FaSuitcase className='mt-1' />
                    <span>Baggage: 4</span>
                  </div>
                  <div className='flex items-center gap-2 text-gray-500'>
                    <GiGearStickPattern className='mt-1' />
                    <span>{car.gear}</span>
                  </div>
                </div>
              </div>

              <div className='flex items-center gap-2 mt-16 text-blue-400'>
                <IoMdLocate className='mt-1' />
                <span>{car.location} Airport</span>
              </div>
            </div>

            {/* Price */}
            <div className='flex flex-col justify-end'>
              <p className='text-gray-500'>Price for {totalDays} days:</p>
              <div className='flex justify-around'>
                <h2 className='font-bold uppercase'>USD$</h2>
                <div>
                  {totalDays ? (
                    <span className='ml-4 font-bold'>
                      ${Math.floor(car.price * totalDays)}
                    </span>
                  ) : null}
                </div>
              </div>
              <p className='text-green-500'>Fee Cancellation</p>
            </div>
          </div>

          {/* Footer with Reviews and Button */}
          <div className='w-full border-2 h-20 border-t-gray-300 rounded-b-md'>
            <div className='flex justify-between p-3'>
              <div className='flex flex-row gap-4 p-3 text-gray-500 text-lg'>
                <p>4.7 ⭐</p>
                <p>24 Reviews</p>
              </div>
              <div className='mx-2 my-2'>
                <button
                  disabled={car.isAvailable === false}
                  onClick={() => {
                    if (user) {
                      // User logged in — navigate directly to car details page with query params
                      navigate(
                        `/car/${car._id}?${createSearchParams({
                          totalDays: totalDays.toString(),
                          from: from || "",
                          to: to || "",
                        })}`
                      );
                    } else {
                      // User NOT logged in — redirect to login with redirect back to car details
                      navigate({
                        pathname: `/login`,
                        search: `?${createSearchParams({
                          redirect: `/car/${car._id}`,
                          totalDays,
                          from,
                          to,
                        })}`,
                      });
                    }
                  }}
                  className={`w-[300px] p-2 rounded text-white ${
                    car.isAvailable === false
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-400 to-blue-600 hover:brightness-110"
                  }`}
                >
                  {car.isAvailable === false ? (
                    <>
                      <span className='text-xl'>Car is booked until&nbsp;</span>
                      <span className='text-black font-bold'>{to}</span>
                    </>
                  ) : (
                    "View More Details"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Location;
