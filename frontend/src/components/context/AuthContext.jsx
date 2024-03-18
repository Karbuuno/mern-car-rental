import React, { useState, createContext, useEffect, useContext } from "react";
// import axios from "axios";
// import { login } from "./../api/userApi";
export const GlobalContext = createContext(null);
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // booking context
  // const [booking, setBooking] = useState(() => {
  //   const booking = localStorage.getItem("booking");
  //   return booking ? JSON.parse(booking) : null;
  // });

  // useEffect(() => {
  //   if (booking) {
  //     localStorage.setItem("booking", JSON.stringify(booking));
  //   } else {
  //     localStorage.removeItem("booking");
  //   }
  // }, [booking]);

  return (
    <GlobalContext.Provider value={{ user, setUser }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const UseContext = () => useContext(GlobalContext);
