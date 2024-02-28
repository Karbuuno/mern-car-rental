import axios from "axios";

export const login = async inputs => {
  try {
    const { data } = await axios.post("/api/users/auth/", inputs, {
      headers: {
        "content-type": "application/json",
      },
    });
    return data;
  } catch (error) {
    console.log(error.message);
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
