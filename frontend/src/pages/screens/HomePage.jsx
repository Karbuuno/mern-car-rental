import React from "react";
import HeroPage from "./HeroPage";
import Cars from "./CarsScreen";

function HomePage() {
  return (
    <>
      <div className=''>
        {/* <Header /> */}
        <HeroPage />
        <Cars />
      </div>
    </>
  );
}

export default HomePage;
