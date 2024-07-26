import React from "react";
import { GiCarDoor, GiGearStickPattern } from "react-icons/gi";
import { carDetails, checkout } from "@/components/api/api";

// import { dayDifference } from "@/components/api/daysDiff";

import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { UseContext } from "@/components/context/AuthContext";
import { FaSuitcase, FaUser } from "react-icons/fa";
import { IoMdLocate, IoMdSpeedometer } from "react-icons/io";

function CarDetailsScreen() {
  const { search } = useLocation();
  const QueryClient = useQueryClient();
  // const navigate = useNavigate();
  const searchParams = new URLSearchParams(search);
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const totalDays = searchParams.get("totalDays");
  console.log(from, to);

  // const totalDays = dayDifference(from, to);
  const { user, setUser } = UseContext();
  const { id } = useParams();

  const { data, error, isLoading } = useQuery({
    queryKey: ["cars", id],
    queryFn: () => carDetails(id),
  });

  /// tripe dat
  const stripeMutation = useMutation({
    mutationFn: checkout,
    onSuccess: data => {
      QueryClient.invalidateQueries({ queryKey: ["checkout"] });
      // navigate("/");
      console.log(data);
    },
  });

  let stripeData = {
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
  };

  const handlePayment = async e => {
    e.preventDefault();
    stripeMutation.mutate(stripeData);
  };

  return (
    <>
      <div className='px-8 py-12 w-[70%] mx-auto'>
        <Link
          to='/'
          className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mb-6'
        >
          Go Back
        </Link>
        <div className='flex flex-col flex-grow gap-2 shadow-2xl bg-white rounded-md mt-4'>
          <div className='flex justify-between px-4 w-full h-80  '>
            {/* {image} */}
            <div className='flex items-center px-3'>
              <img src={data?.car?.image} alt='Kia Sportage' />
            </div>
            {/* {details} */}

            <div className='mt-8 px-4'>
              <h2 className='font-bold uppercase'>
                {data?.car?.name} {""}
                {data?.car.model}
              </h2>
              <div className='flex justify-between gap-8 mt-8 flex-row '>
                <div className='flex flex-row gap-2 '>
                  <div>
                    <div className='flex flex-row gap-2 '>
                      <FaUser className='mt-3' />
                      <div className='mt-2'>
                        Seats:<span className='p-2'>{data?.car?.seats}</span>
                      </div>
                    </div>
                    <div className='flex flex-row gap-2'>
                      <GiCarDoor className='mt-3' />
                      <div className='mt-2'>
                        Doors:<span className='p-2'>{data?.car?.doors}</span>
                      </div>
                    </div>
                    <div></div>
                    <div className='flex flex-row gap-2'>
                      <IoMdSpeedometer className='mt-3' />
                      <div className='mt-2'>{data?.car?.type}</div>
                    </div>
                  </div>
                  <div>
                    <div className='flex flex-row gap-2'>
                      <FaSuitcase className='mt-3' />
                      <div className='mt-2'>{data?.car?.fuel}</div>
                    </div>
                    <div className='flex flex-row gap-2'>
                      <GiGearStickPattern className='mt-3' />
                      <div className='mt-2'>{data?.car?.gear}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex flex-row gap-2 mt-16'>
                <IoMdLocate className='mt-1' />
                <div className='text-blue-400'>
                  {data?.car?.location} Airport
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
                      ${Math.floor(data?.car?.price * totalDays)}
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
              <div className='mx-2 my-2 w-[20%] '>
                <button
                  onClick={handlePayment}
                  className=' group-hover: bg-gradient-to-r from-blue-400 to-blue-600 p-2 rounded text-white  w-full text-2xl '
                >
                  Book New
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
    // <div>
    //   <div className='container mx-auto my-8'>
    //     <Link
    //       to='/'
    //       className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
    //     >
    //       Go Back
    //     </Link>
    //     <div className=' flex flex-col rounded  bg-gray-50 shadow-md mt-6 w-full   text-center  '>
    //       <div className='flex flex-row space-x-6 space-10  mix-blend-multiply'>
    //         <div className='flex flex-col'>
    //           <div className='mx-10 my-5'>
    //             <img
    //               src={data?.car?.image}
    //               alt={data?.car?.make}
    //               className=''
    //             />
    //           </div>
    //           <div className='flex justify-around'>
    //             <div>
    //               <div>Suv</div>
    //               <h1 className='font-bold'>Kia Sportage</h1>
    //               <div className=''>
    //                 {totalDays ? (
    //                   <span className='ml-4 font-bold'>
    //                     ${Math.floor(data?.car?.price * totalDays)}
    //                   </span>
    //                 ) : null}
    //               </div>
    //             </div>
    //             <div>⭐⭐⭐⭐⭐</div>
    //           </div>
    //         </div>
    //         <div className='flex flex-col space-x-6 mt-10'>
    //           <div className=' flex  text-center text-gray-500'>
    //             <GiGearStickPattern className='w-full text-[22px] mb-2' />

    //             <h3>{data?.car?.make}</h3>
    //           </div>
    //           <div className='flex space-x-6 text-center text-gray-500'>
    //             <GiGearStickPattern className='w-full text-[22px] mb-2' />

    //             <h3>{data?.car?.make}</h3>
    //           </div>
    //           <div className='flex space-x-6 text-center text-gray-500'>
    //             <GiGearStickPattern className='w-full text-[22px] mb-2' />

    //             <h3>{data?.car?.make}</h3>
    //           </div>
    //           <div className='flex space-x-6 text-center text-gray-500'>
    //             <GiGearStickPattern className='w-full text-[22px] mb-2' />

    //             <h3>{data?.car?.make}</h3>
    //           </div>
    //           <div className='flex space-x-6 text-center text-gray-500'>
    //             <GiGearStickPattern className='w-full text-[22px] mb-2' />

    //             <h3>{data?.car?.make}</h3>
    //           </div>
    //         </div>
    //       </div>
    //       <div className='mx-2 my-2'>
    //         <button
    //           onClick={handlePayment}
    //           className=' group-hover: bg-gradient-to-r from-blue-400 to-blue-600 p-2 rounded text-white  w-full '
    //         >
    //           Book New
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}

export default CarDetailsScreen;
