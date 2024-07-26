import React from "react";
import { GiCarDoor, GiGearStickPattern } from "react-icons/gi";
import { useQuery } from "react-query";

// import { UseContext } from "@/components/context/AuthContext";
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

function Location() {
  const { location } = useParams();
  const navigate = useNavigate();
  const { search } = useLocation();

  const searchParams = new URLSearchParams(search);
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const totalDays = dayDifference(from, to);

  // console.log(from, to, totalDays);
  const { data, error, isLoading } = useQuery({
    queryKey: ["search", location],
    queryFn: () => SearchCarsData(location),
  });

  console.log("data", data);

  // redirect=/car/${
  //   car._id
  // }&totalDays=${encodeURIComponent(
  //   totalDays
  // )}&from=${encodeURIComponent(
  //   from
  // )}&to=${encodeURIComponent(to)}

  const params = { totalDays: totalDays };

  // navigate({
  //   pathname: "/posts",
  //   search: `?${createSearchParams(params)}`,
  // });

  return (
    <>
      {/* <div className='h-screen w-full mx-auto '>
        
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center place-items-center px-24 mt-16 gap-x-8    '>
          {isLoading ? (
            <h3>...loading</h3>
          ) : error ? (
            <h3>{error.data.massage}</h3>
          ) : (
            <>
              {data?.length === 0 && (
                <h1 className='text-2xl font-bold ml-20'>Car Not Found</h1>
              )}
              {data.searchedCar.map(car => (
                <div key={car._id}>
                  <div className=' flex flex-col rounded  bg-gray-200 shadow-md mt-6 mx-auto  text-center  '>
                    <div className='flex flex-row space-x-6 space-10  mix-blend-multiply'>
                      <div className='flex flex-col'>
                        <div className='mx-10 my-5'>
                          <img src={car.image} alt={car.make} className='' />
                        </div>
                        <div className='flex justify-around'>
                          <div>
                            <div>Suv</div>
                            <h1 className='font-bold'>Kia Sportage</h1>
                            <div>
                              Price for{" "}
                              <span className='ml-4 font-bold'>
                                {totalDays} days
                              </span>
                              {totalDays ? (
                                <span className='ml-4 font-bold'>
                                  ${Math.floor(car?.price * totalDays)}
                                </span>
                              ) : null}
                            </div>
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
                    <div className=' mx-2 my-2'>
                      <button
                        disabled={car.isAvailable == false}
                        // onClick={() =>
                        //   navigate(
                        //     `/login?redirect=/car/${car._id}&totalDays=${totalDays}`
                        //   )
                        // }
                        onClick={() => {
                          navigate({
                            pathname: `/login`,
                            search: `?${createSearchParams({
                              redirect: `/car/${car._id}`,
                              totalDays: totalDays,
                              from: from,
                              to: to,
                            })}`,
                          });
                        }}
                        // onClick={() =>
                        //   navigate(
                        //     `/login?redirect=/car/${
                        //       car._id
                        //     }&totalDays=${encodeURIComponent(
                        //       totalDays
                        //     )}&from=${encodeURIComponent(
                        //       from
                        //     )}&to=${encodeURIComponent(to)}`
                        //   )
                        // }
                      >
                        {car.isAvailable == false ? (
                          <div className='bg-gray-400 p-2 rounded text-white w-[300px]'>
                            <span className='text-xl'>Car is booked until</span>
                            &nbsp;
                            <span className='text-black font-bold '>{to}</span>
                          </div>
                        ) : (
                          <div className=' group-hover: bg-gradient-to-r from-blue-400 to-blue-600 p-2 rounded text-white w-[300px] '>
                            View More Details
                          </div>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div> */}

      <div className='flex  justify-between  flex-wrap gap-x-4 gap-y-12 mt-10 px-3 md:px-5 lg:px-8 xl:px-16'>
        {isLoading ? (
          <h3>...loading</h3>
        ) : error ? (
          <h3>Data not found</h3>
        ) : (
          <>
            {data.searchedCar.map(car => (
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
                            <div className='mt-2'>Limited Mileage</div>
                          </div>
                        </div>
                        <div>
                          <div className='flex flex-row gap-2'>
                            <FaSuitcase className='mt-3' />
                            <div className='mt-2'>
                              Baggage: <span className='px-2'>4</span>
                            </div>
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
                    <p className='text-gray-500'>Price for {totalDays} days:</p>
                    <div className='flex justify-around'>
                      <h2 className='font-bold uppercase'>usd$</h2>
                      <div className=''>
                        {totalDays ? (
                          <span className='ml-4 font-bold'>
                            ${Math.floor(car?.price * totalDays)}
                          </span>
                        ) : null}
                      </div>
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
                    <div className=' mx-2 my-2'>
                      <button
                        disabled={car.isAvailable == false}
                        onClick={() => {
                          navigate({
                            pathname: `/login`,
                            search: `?${createSearchParams({
                              redirect: `/car/${car._id}`,
                              totalDays: totalDays,
                              from: from,
                              to: to,
                            })}`,
                          });
                        }}
                      >
                        {car.isAvailable == false ? (
                          <div className='bg-gray-400 p-2 rounded text-white w-[300px]'>
                            <span className='text-xl'>Car is booked until</span>
                            &nbsp;
                            <span className='text-black font-bold '>{to}</span>
                          </div>
                        ) : (
                          <div className=' group-hover: bg-gradient-to-r from-blue-400 to-blue-600 p-2 rounded text-white w-[300px] '>
                            View More Details
                          </div>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}

export default Location;
