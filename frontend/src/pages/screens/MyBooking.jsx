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
import { useQuery } from "react-query";
import { userBookings } from "@/components/api/api";
import { dayDifference } from "@/components/api/daysDiff";
import dayjs from "dayjs";

function MyBooking() {
  const { data, error, isLoading } = useQuery("bookings", userBookings);

  const today = dayjs();
  const currentDate = today.format("YYYY-MM-DD");

  const isPassedEndDate = (endDate, currentDate) => {
    return endDate > currentDate;
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
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            {data?.map(booking => (
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
                  <TableCell className='font-medium'>
                    {booking.isAvailable === true ? (
                      <MdDelete
                        className='text-2xl text-red-500 cursor-pointer'
                        // onClick={() => handleDelete(car?._id)}
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

export default MyBooking;
