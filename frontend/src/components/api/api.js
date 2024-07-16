import axios from "axios";

export const login = async inputs => {
  try {
    const { data } = await axios.post("/api/users/auth/", inputs, {
      headers: {
        "content-type": "application/json",
      },
    });
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const register = async inputs => {
  try {
    const res = await axios.post("/api/users/", inputs, {
      headers: {
        "content-type": "application/json",
        withCredentials: true,
      },
    });

    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
export const logout = async inputs => {
  try {
    const res = await axios.post("/api/users/logout/");

    // const token = res?.data?.token'
    console.log(res);
  } catch (error) {
    console.log(error.message);
  }
};

//all cars
export const allCarsData = async () => {
  const { data } = await axios.get("/api/cars");
  return data;
};
//single car
export const carDetails = async id => {
  const { data } = await axios.get(`/api/cars/${id}`);
  return data;
};
// register a car
export const registerCar = async FormData => {
  const { data } = await axios.post("/api/cars/", FormData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return data;
};

//search car details
export const SearchCarsData = async location => {
  const { data } = await axios.get(`/api/cars/search/${location}`);
  console.log(data);
  return data;
};

// stripe api
export const checkout = async stripeData => {
  try {
    const { data } = await axios.post(
      "/api/stripe/create-checkout",
      stripeData,
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );
    if (data) {
      window.location.href = data.url;
    }
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

//Update car
export const updateCar = async updatedCar => {
  const { data } = await axios.put(`/api/cars/${updatedCar._id}`, updatedCar, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};
export const updateProfile = async updatedUser => {
  const { data } = await axios.put(`/api/users/profile`, updatedUser, {
    headers: { "Content-Type": "application/json" },
  });
  return data;
};

// Delete car
export const deleteCar = async id => {
  const { data } = await axios.delete(`/api/cars/${id}`);
  return data;
};

// user bookings
export const userBookings = async () => {
  const { data } = await axios.get("/api/bookings/myBookings");
  return data;
};
export const allBookings = async () => {
  const { data } = await axios.get("/api/bookings/allBookings");
  return data;
};
export const carAvailable = async id => {
  const { data } = await axios.put(`/api/cars/available/${id}`, {
    headers: {
      "content-type": "application/json",
    },
  });
  return data;
};

//delete booking
export const deleteBooking = async id => {
  const { data } = await axios.delete(`/api/bookings/delete-booking/${id}`);
  return data;
};
