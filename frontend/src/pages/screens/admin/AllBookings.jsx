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
import { MdDelete } from "react-icons/md";
import { QueryClient, useMutation, useQuery } from "react-query";
import { allBookings, carAvailable } from "@/components/api/api";
import dayjs from "dayjs";
import { dayDifference } from "@/components/api/daysDiff";

function AllBookings() {
  // fetch all bookings
  const { data, error, isLoading } = useQuery("bookings", allBookings);
  //getting current data
  const today = dayjs();
  const currentDate = today.format("YYYY-MM-DD");
  const isPassedEndDate = (endDate, currentDate) => {
    return endDate > currentDate;
  };
  // car availability
  const carAvailableMutation = useMutation({
    mutationFn: carAvailable,
    onSuccess: data => {
      QueryClient.invalidateQueries({ queryKey: ["bookings"] });
      console.log(data);
    },
  });
  // handle available
  const handleAvailable = async id => {
    carAvailableMutation.mutate(id);
  };

  return (
    <>
      <div className='w-[900px] mx-auto mt-12 '>
        {isLoading ? (
          <h3>...loading</h3>
        ) : error ? (
          <h3>{<h3>Data not found</h3>}</h3>
        ) : (
          <Table>
            <TableCaption>A list of your recent Booking.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Reg Number</TableHead>
                <TableHead>Car Make</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Car Availability</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            {data?.bookings.map(booking => (
              <TableBody key={booking._id}>
                <TableRow>
                  <TableCell className='font-medium'>
                    {booking.regNumber}
                  </TableCell>
                  <TableCell className='font-medium'>{booking.make}</TableCell>
                  <TableCell className='font-medium'>
                    {booking.startDate}
                  </TableCell>
                  <TableCell className='font-medium'>
                    {booking.endDate}
                  </TableCell>
                  <TableCell className='font-medium'>
                    <span className='font-bold'>£</span>
                    {booking.totalPrice}
                  </TableCell>
                  <TableCell>
                    {booking.isAvailable === false && (
                      <button
                        onClick={() =>
                          handleAvailable(booking?._id, {
                            isAvailable: booking.isAvailable,
                          })
                        }
                      >
                        Booked
                      </button>
                    )}
                  </TableCell>
                  <TableCell className='font-medium'>
                    {booking.isAvailable === true ? (
                      <MdDelete
                        className='text-2xl text-red-500 cursor-pointer'
                        onClick={() => handleDelete(booking?._id)}
                      />
                    ) : (
                      <div>
                        {dayDifference(currentDate, booking.endDate)} Days Left
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>
        )}
      </div>
    </>
  );
}

export default AllBookings;
