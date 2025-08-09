import React from "react";
import Search from "./Search";

function HeroPage() {
  return (
    <section className='relative h-screen w-full'>
      {/* Background Image */}
      <img
        src='https://res.cloudinary.com/dunopxgwq/image/upload/v1721329358/mercedes_izmyny.webp'
        alt='Luxury rental car'
        className='absolute inset-0 w-full h-full object-cover'
      />

      {/* Gradient Overlay */}
      <div className='absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70' />

      {/* Content */}
      <div className='relative z-10 flex flex-col items-center justify-center text-center h-full px-6'>
        {/* Title */}
        <h1 className='text-5xl md:text-6xl font-bold text-white drop-shadow-lg'>
          Drive Your Dream Car Today
        </h1>

        {/* Subtitle */}
        <p className='mt-4 text-lg md:text-xl text-gray-200 max-w-2xl'>
          Affordable rentals, premium cars, and an experience you'll never
          forget.
        </p>

        {/* Search Bar */}
        <div className='mt-12 w-full max-w-4xl'>
          <Search />
        </div>
      </div>
    </section>
  );
}

export default HeroPage;
