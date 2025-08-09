import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { UseContext } from "@/components/context/AuthContext";
import DropDownMenu from "@/components/DropDownMenu";

function Header() {
  const [navOpen, setNavOpen] = useState(false);
  const { user } = UseContext();
  const location = useLocation();

  useEffect(() => {
    setNavOpen(false); // Close menu on route change
  }, [location]);

  return (
    <header className='fixed top-0 left-0 w-full bg-black text-white shadow-lg z-50'>
      <div className='max-w-7xl mx-auto px-6 flex justify-between items-center h-16'>
        {/* Logo */}
        <Link to='/' className='flex items-center gap-2'>
          <h1 className='text-xl md:text-2xl font-bold tracking-wide'>
            CAR RENTAL
          </h1>
        </Link>

        {/* Desktop Nav */}
        <nav className='hidden md:flex gap-6 text-gray-300 font-medium'>
          <Link to='/' className='hover:text-yellow-400 transition'>
            Home
          </Link>
          <Link to='/cars' className='hover:text-yellow-400 transition'>
            Cars
          </Link>
          <Link to='/about' className='hover:text-yellow-400 transition'>
            About
          </Link>
          {user ? (
            <DropDownMenu />
          ) : (
            <Link to='/login' className='hover:text-yellow-400 transition'>
              Login
            </Link>
          )}
        </nav>

        {/* Mobile Toggle */}
        <div
          className='md:hidden text-gray-300 cursor-pointer'
          onClick={() => setNavOpen(!navOpen)}
        >
          {navOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </div>
      </div>

      {/* Overlay */}
      {navOpen && (
        <div
          className='fixed inset-0 bg-black/50 backdrop-blur-sm z-40'
          onClick={() => setNavOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-black/95 backdrop-blur-md shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          navOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <nav className='flex flex-col items-start p-6 gap-6 text-gray-300 text-lg'>
          <Link
            to='/'
            className='hover:text-yellow-400'
            onClick={() => setNavOpen(false)}
          >
            Home
          </Link>
          <Link
            to='/cars'
            className='hover:text-yellow-400'
            onClick={() => setNavOpen(false)}
          >
            Cars
          </Link>
          <Link
            to='/about'
            className='hover:text-yellow-400'
            onClick={() => setNavOpen(false)}
          >
            About
          </Link>
          {user ? (
            <DropDownMenu />
          ) : (
            <Link
              to='/login'
              className='hover:text-yellow-400'
              onClick={() => setNavOpen(false)}
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
