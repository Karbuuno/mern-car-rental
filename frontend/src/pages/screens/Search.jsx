import React, { useState } from "react";
import { SearchCarsData } from "@/components/api/api";
import { Link, useParams, useNavigate } from "react-router-dom";

// import { useMutation, useQueryClient, useQuery } from "react-query";
import Location from "./Location";
import { UseContext } from "@/components/context/AuthContext";
import dayjs from "dayjs";

function Search() {
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState(null);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  //   const { location } = useParams();
  const { search, setSearch } = UseContext();
  //   const QueryClient = useQueryClient();
  const navigate = useNavigate();
  const today = dayjs();
  const currentDate = today.format("YYYY-MM-DD");
  const submitHandler = async e => {
    e.preventDefault();

    setQuery(searchInput);
    if (searchInput && startDate && endDate) {
      navigate(`/cars/search/${searchInput}?from=${startDate}&to=${endDate}`);
    }

    // console.log(
    //   "totalDays",
    //   totalDays,
    //   "startDate",
    //   startDate,
    //   "endDate",
    //   endDate
    // );
    // checkout(stripeData);
  };

  return (
    <>
      <div className='md:max-w-screen-lg w-full mx-auto flex flex-col justify-center items-center   h-[300px]  bg-blue-300   rounded-lg  '>
        <form onSubmit={submitHandler} className='z-[10] '>
          <input
            className='w-[250px] md:w-[450px]  lg:w-[600px] border-gray-200 p-4  bg-white outline-none rounded-lg'
            type='text'
            placeholder='Enter the city name'
            // name='startDate'
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}

            // onChange={e => setEmail(e.target.value)}
          />
          <div className='flex flex-col w gap-1 md:flex-col lg:flex-row  mt-3 justify-center items-center '>
            <input
              className=' w-[250px] md:w-[450px] lg:w-[300px] border-gray-200 p-4  bg-white outline-none rounded-lg'
              type='date'
              // name='startDate'
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              min={currentDate}
              // onChange={e => setEmail(e.target.value)}
            />
            <input
              className='w-[250px] md:w-[450px] lg:w-[300px]   border-gray-200 p-4  bg-white outline-none rounded-lg'
              type='date'
              placeholder='Enter password'
              // name='endDate'
              value={endDate}
              onChange={e => {
                startDate && setEndDate(e.target.value);
              }}
              min={currentDate}
              // onChange={e => setPassword(e.target.value)}
            />
          </div>

          <div className='flex justify-end mt-6'>
            <button
              type='submit'
              className='bg-black  text-white font-bold py-2 px-4 rounded-md'
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Search;
