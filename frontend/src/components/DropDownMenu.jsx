import React from "react";
import { PiUserList } from "react-icons/pi";
import { IoLogOutOutline } from "react-icons/io5";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UseContext } from "./context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { logout } from "./api/api";

function DropDownMenu() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { user, setUser } = UseContext();

  const { mutate } = useMutation({
    mutationFn: logout,
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ["logout"] });
      setUser(data);
    },
    onError: err => {
      console.error(err);
    },
  });

  const logoutHandler = e => {
    e.preventDefault();
    if (user) {
      localStorage.removeItem("user");
    }
    mutate();
    navigate("/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='focus:outline-none'>
        <PiUserList className='h-7 w-7 cursor-pointer hover:text-yellow-400 transition' />
      </DropdownMenuTrigger>

      <DropdownMenuContent className='min-w-[220px] p-2'>
        {/* User Info */}
        <DropdownMenuLabel className='text-lg font-semibold'>
          <Link to='/profile' className='hover:underline'>
            {user?.name || "Profile"}
          </Link>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* Links */}
        <DropdownMenuItem asChild>
          <Link to='/profile' className='w-full block'>
            Profile
          </Link>
        </DropdownMenuItem>

        {user?.isAdmin && (
          <DropdownMenuItem asChild>
            <Link to='/cars/admin/all-bookings' className='w-full block'>
              All Bookings
            </Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuItem asChild>
          <Link
            to={user?.isAdmin ? "/cars/admin/carlist" : "/my-booking"}
            className='w-full block'
          >
            {user?.isAdmin ? "Car List" : "My Booking"}
          </Link>
        </DropdownMenuItem>

        {/* Logout */}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={logoutHandler}
          className='text-red-500 font-medium cursor-pointer'
        >
          <IoLogOutOutline className='mr-2 h-5 w-5' />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DropDownMenu;
