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
  // Fetch user bookings
  const { data, error, isLoading } = useQuery("bookings", userBookings);
  const queryClient = useQueryClient();

  const today = dayjs();
  const currentDate = today.format("YYYY-MM-DD");

  // Mutation for deleting a booking
  const deleteBookingMutation = useMutation({
    mutationFn: deleteBooking,
    onSuccess: () => {
      // Invalidate "bookings" so table refreshes immediately
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });

  const handleDelete = id => {
    deleteBookingMutation.mutate(id);
  };

  return (
    <div className='w-[900px] mx-auto mt-12'>
      {isLoading ? (
        <h3>...loading</h3>
      ) : error ? (
        <h3>Data not found</h3>
      ) : (
        <Table>
          <TableCaption>A list of your recent bookings.</TableCaption>
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
                <TableCell className='font-medium'>{booking.endDate}</TableCell>
                <TableCell className='font-medium'>
                  <span className='font-bold'>£</span>
                  {booking.totalPrice}
                </TableCell>
                <TableCell className='font-medium'>
                  {!booking?.isAvailable ? (
                    <div
                      className='flex justify-center items-center p-2 w-[100px] text-2xl rounded-md cursor-pointer text-white bg-red-300 shadow-lg shadow-gray-100/50'
                      onClick={() => handleDelete(booking._id)}
                    >
                      <MdDelete />
                    </div>
                  ) : (
                    <div className='p-2 w-[150px] rounded-md text-center bg-blue-500 text-white shadow-lg shadow-blue-200/50'>
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
  );
}

export default MyBooking;
