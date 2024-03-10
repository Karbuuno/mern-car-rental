import React from "react";
import hero_image from "../../assets/hero_image3.jpg";

function HeroPage() {
  return (
    <>
      <div name='home' className='h-screen w-full  '>
        <div className='max-w-screen-lg mx-auto flex flex-col items-center justify-center h-screen px-4 md:flex-row'>
          <div className='flex flex-col justify-center h-full'>
            <h2 className='text-4xl sm:text-5xl font-bold text-black'>
              Embark on Seamless Journeys with Our Car Rental Services
            </h2>
            <p className='text-gray-500 py-4 max-w-md'>
              Discover the freedom of the open road with our premier car rental
              offerings. Whether you're planning a weekend getaway, a business
              trip, or an adventurous road trip, we have the perfect vehicle to
              suit your needs. From sleek and stylish sedans to spacious SUVs,
              our fleet is meticulously maintained to ensure a smooth and
              reliable driving experience.
            </p>

            {/* <div>
              <Link
                to='portfolio'
                smooth
                duration={500}
                className='group text-white w-fit px-6 py-3 my-2 flex items-center rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 cursor-pointer'
              >
                Portfolio
                <span className='group-hover:rotate-90 duration-300'>
                  <MdOutlineKeyboardArrowRight size={25} className='ml-1' />
                </span>
              </Link>
            </div> */}
          </div>

          <div className=' mx-auto  mix-blend-multiply   md:w-full '>
            <img src={hero_image} alt='hero image' className=' w-[600px]' />
          </div>
        </div>
      </div>
    </>
  );
}

export default HeroPage;
