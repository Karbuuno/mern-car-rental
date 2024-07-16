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

    console.log("handle");
    // dayDifference(startDate, endDate);
    // setBooking(carData);
    // mutate(carData);
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
      <div className='md:max-w-screen-lg w-full mx-auto flex justify-center items-center   h-[100px] mt-8 bg-gray-100  rounded-lg '>
        <form className='flex flex-col gap-3' onSubmit={submitHandler}>
          <div className='grid grid-cols-4 justify-center items-center '>
            <input
              className=' border-gray-200 py-2 px-6 bg-zinc-100/40 rounded-lg'
              type='text'
              placeholder='Enter the city name'
              // name='startDate'
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}

              // onChange={e => setEmail(e.target.value)}
            />
            <input
              className=' border-gray-200 py-2 px-6 bg-zinc-100/40 rounded-lg'
              type='date'
              // name='startDate'
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              min={currentDate}
              // onChange={e => setEmail(e.target.value)}
            />
            <input
              className=' border-gray-200 py-2 px-6 bg-zinc-100/40 rounded-lg'
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

            <div className='mx-4'>
              <button
                type='submit'
                className='bg-gray-300 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-full'
              >
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Search;
