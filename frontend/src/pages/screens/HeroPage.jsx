import React from "react";
import hero_image from "../../assets/hero_image3.jpg";
import Search from "./Search";

function HeroPage() {
  return (
    <>
      <div className=' h-[400px]  w-full relative mt-8'>
        <img
          src='https://res.cloudinary.com/dunopxgwq/image/upload/v1721329358/mercedes_izmyny.webp'
          alt='hero image'
          className=' w-full h-full  object-cover absolute  bg-cover items-center mix-blend-overlay   '
        />
      </div>
      <Search />
    </>
  );
}

export default HeroPage;
