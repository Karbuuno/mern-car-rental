import React, { useState } from "react";

import { Link, useParams, useNavigate } from "react-router-dom";
import { SearchCarsData } from "@/components/api/api";
import { useMutation, useQueryClient, useQuery } from "react-query";
import Location from "./Location";

function Search() {
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState(null);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  //   const { location } = useParams();
  const QueryClient = useQueryClient();
  const navigate = useNavigate();

  const { data, error, isLoading } = useQuery({
    queryKey: ["car", searchInput],
    queryFn: () => SearchCarsData(searchInput),
    onSuccess: data => {
      console.log(data);
    },
  });
  const submitHandler = async e => {
    e.preventDefault();
    // dayDifference(startDate, endDate);
    // setBooking(carData);
    // mutate(carData);
    setQuery(searchInput);
    console.log(searchInput, startDate, endDate);

    // checkout(stripeData);
  };

  return (
    <div className='flex justify-center items-center w-[1000px] mx-auto h-[100px] bg-gray-100  rounded-lg '>
      <form className='flex flex-col gap-3' onSubmit={submitHandler}>
        <div className='flex justify-center items-center '>
          <input
            className='w-[300px] border-gray-200 py-2 px-6 bg-zinc-100/40 rounded-lg'
            type='text'
            placeholder='Enter the city name'
            // name='startDate'
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            // onChange={e => setEmail(e.target.value)}
          />
          <input
            className='w-[250px] border-gray-200 py-2 px-6 bg-zinc-100/40 rounded-lg'
            type='date'
            placeholder='Enter email'
            // name='startDate'
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            // onChange={e => setEmail(e.target.value)}
          />
          <input
            className='w-[250px] border-gray-200 py-2 px-6 bg-zinc-100/40 rounded-lg'
            type='date'
            placeholder='Enter password'
            // name='endDate'
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            // onChange={e => setPassword(e.target.value)}
          />

          <div className='mx-4'>
            <button
              onClick={() => navigate(`/cars/${searchInput}`)}
              type='submit'
              className='bg-gray-300 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-full'
            >
              Search
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Search;
