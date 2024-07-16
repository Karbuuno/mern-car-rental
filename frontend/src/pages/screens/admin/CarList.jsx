import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { allCarsData, deleteCar } from "@/components/api/api";
import { useMutation, useQuery, useQueryClient } from "react-query";
import CarTable from "./CarTable";
import DialogForm from "@/components/DialogForm";

function CarList() {
  //   const { id } = useParams();
  const { data, error, isLoading } = useQuery("cars", allCarsData);
  // console.log(data);
  // console.log(car);

  return (
    <>
      <div className='w-[900px] mx-auto '>
        <DialogForm />
        <div>
          {isLoading ? (
            <h3>...loading</h3>
          ) : error ? (
            <h3>{<h3>Data not found</h3>}</h3>
          ) : (
            <Table>
              <TableCaption>Car List.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Make</TableHead>
                  <TableHead>Model</TableHead>
                  <TableHead>Reg Number</TableHead>

                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>

              {data?.cars.map(car => (
                <TableBody key={car._id}>
                  <TableRow>
                    <CarTable car={car} />
                  </TableRow>
                </TableBody>
              ))}
            </Table>
          )}
        </div>
      </div>
    </>
    // <TableRow>
    //   <TableCell className='font-medium'>{car?.name}</TableCell>

    //   <TableCell className='font-medium'>{car?.model}</TableCell>
    //   <TableCell className='font-medium'>{car?.regNumber}</TableCell>
    //   <TableCell className='font-medium'>Imagelinke</TableCell>
    //   <TableCell>
    //     <MdEdit className='text-2xl' />
    //   </TableCell>
    //   <TableCell>
    //     <MdDelete
    //       className='text-2xl text-red-500 cursor-pointer'
    //       onClick={() => handleDelete(car?._id)}
    //     />
    //   </TableCell>
    // </TableRow>
  );
}

export default CarList;
