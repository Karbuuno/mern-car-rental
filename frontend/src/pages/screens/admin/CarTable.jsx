import React from "react";
import { MdEdit, MdDelete } from "react-icons/md";

import { TableCell } from "@/components/ui/table";

import { useMutation, useQueryClient } from "react-query";
import { carAvailable, deleteCar } from "@/components/api/api";
import DialogForm from "@/components/DialogForm";

function CarTable({ car }) {
  // const { data, error, isLoading } = useQuery("cars", allCarsData);
  // console.log(allCarsData);
  // Delete car
  const QueryClient = useQueryClient();
  const deleteCareMutation = useMutation({
    mutationFn: deleteCar,
    onSuccess: data => {
      console.log(data);
      QueryClient.invalidateQueries({ queryKey: ["cars"] });
    },
  });
  const carAvailableMutation = useMutation({
    mutationFn: carAvailable,
    onSuccess: data => {
      QueryClient.invalidateQueries({ queryKey: ["bookings"] });
      console.log(data);
    },
  });

  const handleAvailable = async id => {
    carAvailableMutation.mutate(id);
  };

  const handleDelete = async id => {
    deleteCareMutation.mutate(id);
  };

  return (
    <>
      <TableCell className='font-medium'>{car?.name}</TableCell>

      <TableCell className='font-medium'>{car?.model}</TableCell>
      <TableCell className='font-medium'>{car?.regNumber}</TableCell>
      <TableCell>
        {car.isAvailable === false ? (
          <div className=' flex place-content-center p-2 w-[100px] text-xl rounded-md cursor-pointer  text-white place-items-center  bg-blue-300 shadow-lg shadow-gray-100/50'>
            Booked
          </div>
        ) : (
          <div className=' flex place-content-center p-2 w-[100px] text-xl rounded-md cursor-pointer  text-white place-items-center  bg-green-300 shadow-lg shadow-gray-100/50'>
            Available
          </div>
        )}
      </TableCell>
      <TableCell>
        <div className=' flex place-content-center  w-[100px] h-[40px] text-2xl rounded-md cursor-pointer  text-white place-items-center  bg-gray-300 shadow-lg shadow-gray-100/50'>
          <DialogForm carToEdit={car} buttonTitle='Update Car' />
        </div>
      </TableCell>

      <TableCell>
        {car.isAvailable === true ? (
          <div className=' flex place-content-center p-2 w-[100px] text-2xl rounded-md cursor-pointer  text-white place-items-center  bg-red-300 shadow-lg shadow-gray-100/50'>
            <MdDelete
              className=' cursor-pointer'
              onClick={() => handleDelete(car?._id)}
            />
          </div>
        ) : (
          <div className=' flex place-content-center p-2 w-[100px] h-[40px] text-xl rounded-md cursor-pointer  text-white place-items-center  bg-blue-300 shadow-lg shadow-gray-100/50'>
            Booked
          </div>
        )}
      </TableCell>
    </>
  );
}

export default CarTable;
