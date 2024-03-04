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
export const allCarsData = async () => {
  const { data } = await axios.get("/api/cars");
  return data;
};
