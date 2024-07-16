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
import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteBooking, userBookings } from "@/components/api/api";
import { dayDifference } from "@/components/api/daysDiff";
import dayjs from "dayjs";

function MyBooking() {
  const { data, error, isLoading } = useQuery("bookings", userBookings);
  const QueryClient = useQueryClient();
  const today = dayjs();
  const currentDate = today.format("YYYY-MM-DD");

  const isPassedEndDate = (endDate, currentDate) => {
    return endDate > currentDate;
  };
  const deleteBookingMutation = useMutation({
    mutationFn: deleteBooking,
    onSuccess: data => {
      QueryClient.invalidateQueries({ queryKey: ["cars"] });
    },
  });

  //handle handleDelete
  const handleDelete = async id => {
    deleteBookingMutation.mutate(id);
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
                      <div className=' flex place-content-center p-2 w-[100px] text-2xl rounded-md cursor-pointer  text-white place-items-center  bg-red-300 shadow-lg shadow-gray-100/50'>
                        <MdDelete
                          className=' item-center '
                          onClick={() => handleDelete(booking?._id)}
                        />
                      </div>
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
