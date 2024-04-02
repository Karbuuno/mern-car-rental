import React from "react";
import DialogForm from "@/components/DialogForm";
import { MdEdit, MdDelete } from "react-icons/md";
import { allCarsData } from "@/components/api/api";
import { useQuery } from "react-query";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function CarList() {
  const { data, error, isLoading } = useQuery("users", allCarsData);
  console.log(data);
  return (
    <>
      <div className='w-[900px] mx-auto '>
        <DialogForm />
        <div>
          {isLoading ? (
            <h3>...loading</h3>
          ) : error ? (
            <h3>{<h3>Dta not found</h3>}</h3>
          ) : (
            <Table>
              <TableCaption>Car list.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Make</TableHead>
                  <TableHead>Model</TableHead>
                  <TableHead>Reg Number</TableHead>
                  <TableHead>Image Link</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              {data?.cars.map(car => (
                <TableBody key={car._id}>
                  <TableRow>
                    <TableCell className='font-medium'>{car.name}</TableCell>

                    <TableCell className='font-medium'>{car.model}</TableCell>
                    <TableCell className='font-medium'>
                      {car.regNumber}
                    </TableCell>
                    <TableCell className='font-medium'>Imagelinke</TableCell>
                    <TableCell>
                      <MdEdit className='text-2xl' />
                    </TableCell>
                    <TableCell>
                      <MdDelete className='text-2xl' />
                    </TableCell>
                  </TableRow>
                </TableBody>
              ))}
            </Table>
          )}
        </div>
      </div>
    </>
  );
}

export default CarList;
