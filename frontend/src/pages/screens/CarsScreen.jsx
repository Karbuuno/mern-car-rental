import React from "react";
import { useQuery } from "react-query";
import { GiGearStickPattern, GiCarDoor } from "react-icons/gi";
import { IoMdSpeedometer, IoMdLocate } from "react-icons/io";
import { FaUser, FaSuitcase } from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { allCarsData } from "@/components/api/api";
import Search from "./Search";
import SearchModel from "./SearchModel";

function HomeScreen() {
  const { data, error, isLoading } = useQuery("cars", allCarsData);

  const navigate = useNavigate();

  return (
    <>
      <div className='mt-20 px-3 md:px-5 lg:px-8 xl:px-16 flex justify-between flex-wrap gap-x-4 gap-y-12'>
        {isLoading ? (
          <h3>...loading</h3>
        ) : error ? (
          <h3>Data not found</h3>
        ) : (
          <>
            {data.cars.map(car => (
              <div
                className='flex flex-col flex-grow gap-2 shadow-2xl bg-white rounded-md ms:w-full  md:w-full lg:w-[45%]'
                key={car?._id}
              >
                <div className='flex justify-between px-4 w-full h-80 '>
                  {/* {image} */}
                  <div className='flex items-center px-3'>
                    <img src={car?.image} alt='Kia Sportage' />
                  </div>
                  {/* {details} */}

                  <div className='mt-8 px-4'>
                    <h2 className='font-bold uppercase'>
                      {car?.name} {""}
                      {car.model}
                    </h2>
                    <div className='flex justify-between gap-8 mt-8 flex-row '>
                      <div className='flex flex-row gap-2 '>
                        <div>
                          <div className='flex flex-row gap-2 '>
                            <FaUser className='mt-3' />
                            <div className='mt-2'>
                              Seats:<span className='p-2'>{car?.seats}</span>
                            </div>
                          </div>
                          <div className='flex flex-row gap-2'>
                            <GiCarDoor className='mt-3' />
                            <div className='mt-2'>
                              Doors:<span className='p-2'>{car?.doors}</span>
                            </div>
                          </div>
                          <div></div>
                          <div className='flex flex-row gap-2'>
                            <IoMdSpeedometer className='mt-3' />
                            <div className='mt-2'>{car?.carType}</div>
                          </div>
                        </div>
                        <div>
                          <div className='flex flex-row gap-2'>
                            <FaSuitcase className='mt-3' />
                            <div className='mt-2'>{car?.fuel}</div>
                          </div>
                          <div className='flex flex-row gap-2'>
                            <GiGearStickPattern className='mt-3' />
                            <div className='mt-2'>{car?.gear}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='flex flex-row gap-2 mt-16'>
                      <IoMdLocate className='mt-1' />
                      <div className='text-blue-400'>
                        {car?.location} Airport
                      </div>
                    </div>
                  </div>
                  {/* {price} */}
                  <div className='flex flex-col justify-end'>
                    <p className='text-gray-500'>Price for a day:</p>
                    <div className='flex justify-around'>
                      <h2 className='font-bold uppercase'>usd$</h2>
                      <h2 className='font-black'>{car?.price}</h2>
                    </div>
                    <p className='text-green-500'>Fee Cancellation</p>
                  </div>
                </div>
                <div
                  className='w-ful  border-2 h-20  border-t-gray-300 rounded-b-md
                  '
                >
                  <div className='flex justify-between p-3'>
                    <div className='flex flex-row p-3'>
                      <p className='text-gray-500 text-lg'>4.7 ⭐</p>
                      <p className='text-gray-500 text-lg'>24 Reviews</p>
                    </div>
                    <SearchModel />
                  </div>
                </div>
              </div>
            ))}
          </>
        )}

        {/* <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 justify-items-center place-items-center px-24 mt-16  gap-6   '>
          {isLoading ? (
            <h3>...loading</h3>
          ) : error ? (
            <h3>{<h3>Data not found</h3>}</h3>
          ) : (
            <>
              {data.cars.map(car => (
                <div key={car._id}>
                  <div className=' flex flex-col  rounded  bg-gray-200 shadow-md mt-6 w-[650px] h-[300px]  text-center  '>
                    <div className='flex flex-row space-10  '>
                      <div className='flex flex-col '>
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
                      <SearchModel />
                      
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div> */}
      </div>
    </>
  );
}

export default HomeScreen;
