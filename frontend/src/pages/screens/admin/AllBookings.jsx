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
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import { allBookings, carAvailable, deleteBooking } from "@/components/api/api";
import dayjs from "dayjs";
import { dayDifference } from "@/components/api/daysDiff";

function AllBookings() {
  // fetch all bookings
  const { data, error, isLoading } = useQuery("bookings", allBookings);
  const QueryClient = useQueryClient();
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
  //delete booking

  const deleteBookingMutation = useMutation({
    mutationFn: deleteBooking,
    onSuccess: data => {
      console.log(data);
      QueryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });

  //handle handleDelete
  const handleDelete = async id => {
    deleteBookingMutation.mutate(id);
  };
  // handle available
  const handleAvailable = async id => {
    carAvailableMutation.mutate(id);
  };

  return (
    <>
      <div className='w-[1000px] mx-auto mt-12 '>
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
                  <TableCell className='font-medium'>
                    {booking.isAvailable === false ? (
                      <button
                        onClick={() =>
                          handleAvailable(booking?._id, {
                            isAvailable: booking.isAvailable,
                          })
                        }
                        className='p-2 w-[150px] rounded-md text-white text-center text-lg bg-gray-500 shadow-lg shadow-gray-500/50'
                      >
                        Mark Available
                      </button>
                    ) : (
                      <div className=' p-2 w-[150px] rounded-md text-white text-center text-xl bg-green-500 shadow-lg shadow-green-500/50'>
                        Available
                      </div>
                    )}
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
                      <div className='p-2 w-[150px] rounded-md text-white text-center text-xl bg-blue-500 shadow-lg shadow-blue-200/50'>
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
