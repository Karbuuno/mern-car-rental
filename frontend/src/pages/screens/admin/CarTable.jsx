import React from "react";
import { MdEdit, MdDelete } from "react-icons/md";

import { TableCell } from "@/components/ui/table";

import { useMutation, useQueryClient } from "react-query";
import { deleteCar } from "@/components/api/api";
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

  const handleDelete = async id => {
    deleteCareMutation.mutate(id);
  };

  return (
    <>
      <TableCell className='font-medium'>{car?.name}</TableCell>

      <TableCell className='font-medium'>{car?.model}</TableCell>
      <TableCell className='font-medium'>{car?.regNumber}</TableCell>
      <TableCell className='font-medium'>Imagelinke</TableCell>
      <TableCell>
        <DialogForm carToEdit={car} buttonTitle='Update Car' />
      </TableCell>
      <TableCell>
        <MdDelete
          className='text-2xl text-red-500 cursor-pointer'
          onClick={() => handleDelete(car?._id)}
        />
      </TableCell>
    </>
  );
}

export default CarTable;
