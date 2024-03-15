import React, { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { logout } from "@/components/api/api";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useMutation, useQueryClient } from "react-query";
import { UseContext } from "@/components/context/AuthContext";

function Header() {
  const [nav, setNav] = useState(false);
  const QueryClient = useQueryClient();
  const navigate = useNavigate();
  const { user, setUser } = UseContext();

  const location = useLocation();

  const { mutate, isError, onSuccess } = useMutation({
    mutationFn: logout,
    onSuccess: data => {
      QueryClient.invalidateQueries({ queryKey: ["logout"] });
      setUser(data);
      console.log(data);
    },
    isError: err => {
      console.log(err);
    },
  });

  const logoutHandler = async e => {
    e.preventDefault();
    if (user) {
      localStorage.removeItem("user");
    }
    mutate();
    navigate("/");
  };

  useEffect(() => {
    setNav(false);
  }, [location]);

  return (
    <>
      <div className=' flex justify-between items-center w-full h-20 px-4 text-white bg-black'>
        <div>
          <h1 className='text-5xl  ml-2'>CAR RENTAL</h1>
        </div>

        <div className='hidden md:flex lg:flex'>
          <div className='px-4  capitalize font-medium text-gray-500 curser-pointer'>
            <Link to='/'>HOME</Link>
          </div>
          <div className='px-4 capitalize font-medium text-gray-500 hover:cursor-pointer'>
            <Link to='/cars'>CARS</Link>
          </div>
          <div className='px-4 cursor-pointer capitalize font-medium text-gray-500 hover:cursor-pointer'>
            <Link to=''>ABOUT</Link>
          </div>
          <div className='px-4 cursor-pointer capitalize font-medium text-gray-500 '>
            {user ? (
              <Link to='/login'>
                <IoLogOutOutline className='h-7 w-7' onClick={logoutHandler} />
              </Link>
            ) : (
              <Link to='/login'>
                <FaRegUser className='h-7 w-7' />
              </Link>
            )}
          </div>
        </div>

        <div
          onClick={() => setNav(!nav)}
          className='cursor-pointer pr-4 z-10 text-gray-500 md:hidden'
        >
          {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
        </div>

        {nav && (
          <div className='z-[5] flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-black  md:hidden'>
            <ul>
              <li className='px-4 cursor-pointer capitalize py-6 text-4xl text-white'>
                <Link to='/'>HOME</Link>
              </li>
              <li className='px-4 cursor-pointer capitalize py-6 text-4xl text-white'>
                <Link to='/cars'>CARS</Link>
              </li>
              <li className='px-4 cursor-pointer capitalize py-6 text-4xl text-white'>
                <Link>ABOUT</Link>
              </li>
              <li className='px-4 cursor-pointer capitalize py-6 text-4xl text-white '>
                <Link to='/login'>LOGIN</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default Header;
