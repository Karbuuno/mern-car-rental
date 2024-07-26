import React from "react";
import HeroPage from "./HeroPage";
import Cars from "./CarsScreen";

function HomePage() {
  return (
    <>
      {/* <Header /> */}
      <HeroPage />
      <div className='mt-24 bg-gray-200 '>
        <div className='text-2xl px-4'>Car List</div>
        <Cars />
      </div>
    </>
  );
}

export default HomePage;
