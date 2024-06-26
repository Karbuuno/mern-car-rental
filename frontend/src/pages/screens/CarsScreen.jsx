import React from "react";
import { useQuery } from "react-query";
import { GiGearStickPattern } from "react-icons/gi";

import { useNavigate, useParams } from "react-router-dom";
import { allCarsData } from "@/components/api/api";
import Search from "./Search";

function HomeScreen() {
  const { data, error, isLoading } = useQuery("cars", allCarsData);

  const navigate = useNavigate();

  return (
    <>
      <Search />
      <div className='w-full mx-auto '>
        {/* <div className='flex   h-screen '> */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center place-items-center px-24 mt-16  gap-6   '>
          {isLoading ? (
            <h3>...loading</h3>
          ) : error ? (
            <h3>{<h3>Dta not found</h3>}</h3>
          ) : (
            <>
              {data.cars.map(car => (
                <div key={car._id}>
                  <div className=' flex flex-col rounded  bg-gray-50 shadow-md mt-6 w-full   text-center  '>
                    <div className='flex flex-row space-x-6 space-10  mix-blend-multiply'>
                      <div className='flex flex-col'>
                        <div className='mx-10 my-5'>
                          <img src={car.image} alt={car.make} className='' />
                        </div>
                        <div className='flex justify-around'>
                          <div>
                            <div>Suv</div>
                            <h1 className='font-bold'>{car.model}</h1>
                            <div className=''>${car.price}/day</div>
                          </div>
                          <div>⭐⭐⭐⭐⭐</div>
                        </div>
                      </div>
                      <div className='flex flex-col space-x-6 mt-10'>
                        <div className=' flex  text-center text-gray-500'>
                          <GiGearStickPattern className='w-full text-[22px] mb-2' />

                          <h3>{car.make}</h3>
                        </div>
                        <div className='flex space-x-6 text-center text-gray-500'>
                          <GiGearStickPattern className='w-full text-[22px] mb-2' />

                          <h3>{car.make}</h3>
                        </div>
                        <div className='flex space-x-6 text-center text-gray-500'>
                          <GiGearStickPattern className='w-full text-[22px] mb-2' />

                          <h3>{car.make}</h3>
                        </div>
                        <div className='flex space-x-6 text-center text-gray-500'>
                          <GiGearStickPattern className='w-full text-[22px] mb-2' />

                          <h3>{car.make}</h3>
                        </div>
                        <div className='flex space-x-6 text-center text-gray-500'>
                          <GiGearStickPattern className='w-full text-[22px] mb-2' />

                          <h3>{car.make}</h3>
                        </div>
                      </div>
                    </div>
                    <div className='mx-2 my-2'>
                      <button
                        onClick={() => navigate(`/car/${car._id}`)}
                        className=' group-hover: bg-gradient-to-r from-blue-400 to-blue-600 p-2 rounded text-white  w-full '
                      >
                        View More Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default HomeScreen;
