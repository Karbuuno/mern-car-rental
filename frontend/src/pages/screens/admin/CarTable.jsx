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
        {car.isAvailable === false ? <div>Booked</div> : <div>Available</div>}
      </TableCell>
      <TableCell>
        <DialogForm carToEdit={car} buttonTitle='Update Car' />
      </TableCell>

      <TableCell>
        {car.isAvailable === true ? (
          <MdDelete
            className='text-2xl text-red-500 cursor-pointer'
            onClick={() => handleDelete(car?._id)}
          />
        ) : (
          <div>Booking Valid</div>
        )}
      </TableCell>
    </>
  );
}

export default CarTable;
