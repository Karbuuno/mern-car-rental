import React from "react";
import { GiGearStickPattern } from "react-icons/gi";
import { carDetails } from "@/components/api/api";

import { dayDifference } from "@/components/api/daysDiff";

import { Link, useLocation, useParams } from "react-router-dom";
import { useMutation, useQueryClient, useQuery } from "react-query";

function CarDetailsScreen() {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const totalDays = dayDifference(from, to);

  const { id } = useParams();
  const { data, error, isLoading } = useQuery({
    queryKey: ["cars", id],
    queryFn: () => carDetails(id),
  });

  console.log(
    "data",
    data,
    "totalDays",
    totalDays,
    "startDate",
    from,
    "endDate",
    to
  );

  return (
    <div>
      <div className='container mx-auto my-8'>
        <Link
          to='/'
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          Go Back
        </Link>
        <div className=' flex flex-col rounded  bg-gray-50 shadow-md mt-6 w-full   text-center  '>
          <div className='flex flex-row space-x-6 space-10  mix-blend-multiply'>
            <div className='flex flex-col'>
              <div className='mx-10 my-5'>
                <img
                  src={data?.car?.image}
                  alt={data?.car?.make}
                  className=''
                />
              </div>
              <div className='flex justify-around'>
                <div>
                  <div>Suv</div>
                  <h1 className='font-bold'>Kia Sportage</h1>
                  <div className=''>$89/day</div>
                </div>
                <div>⭐⭐⭐⭐⭐</div>
              </div>
            </div>
            <div className='flex flex-col space-x-6 mt-10'>
              <div className=' flex  text-center text-gray-500'>
                <GiGearStickPattern className='w-full text-[22px] mb-2' />

                <h3>{data?.car?.make}</h3>
              </div>
              <div className='flex space-x-6 text-center text-gray-500'>
                <GiGearStickPattern className='w-full text-[22px] mb-2' />

                <h3>{data?.car?.make}</h3>
              </div>
              <div className='flex space-x-6 text-center text-gray-500'>
                <GiGearStickPattern className='w-full text-[22px] mb-2' />

                <h3>{data?.car?.make}</h3>
              </div>
              <div className='flex space-x-6 text-center text-gray-500'>
                <GiGearStickPattern className='w-full text-[22px] mb-2' />

                <h3>{data?.car?.make}</h3>
              </div>
              <div className='flex space-x-6 text-center text-gray-500'>
                <GiGearStickPattern className='w-full text-[22px] mb-2' />

                <h3>{data?.car?.make}</h3>
              </div>
            </div>
          </div>
          <div className='mx-2 my-2'>
            <button
              onClick={() => navigate(`/car/${data?.car._id}`)}
              className=' group-hover: bg-gradient-to-r from-blue-400 to-blue-600 p-2 rounded text-white  w-full '
            >
              Book New
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarDetailsScreen;
