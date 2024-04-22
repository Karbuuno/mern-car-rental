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
  const QueryClient = useQueryClient();
  const navigate = useNavigate();
  const { user, setUser } = UseContext();
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

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <PiUserList className='h-7 w-7' />
        </DropdownMenuTrigger>

        <DropdownMenuContent className=' m-7'>
          <div className=' flex justify-between w-[250px]'>
            <div className='flex flex-col'>
              <DropdownMenuLabel>
                <Link to='/profile'>{user?.name}</Link>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to='/profile'>Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                {user && user.isAdmin ? (
                  <Link to='/cars/admin/carlist'>Car List</Link>
                ) : (
                  <Link to='/my-booking'>My Booking</Link>
                )}
              </DropdownMenuItem>
            </div>
            <div>
              <DropdownMenuItem>
                <IoLogOutOutline
                  className=' h-7 w-7 '
                  onClick={logoutHandler}
                />
              </DropdownMenuItem>
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default DropDownMenu;
