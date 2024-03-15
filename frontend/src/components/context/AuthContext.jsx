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
  const [search, setSearch] = useState(() => {
    const savedSearch = localStorage.getItem("search");
    return savedSearch ? JSON.parse(savedSearch) : null;
  });

  useEffect(() => {
    if (search) {
      localStorage.setItem("search", JSON.stringify(search));
    } else {
      localStorage.removeItem("search");
    }
  }, [search]);

  return (
    <GlobalContext.Provider value={{ user, setUser, search, setSearch }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const UseContext = () => useContext(GlobalContext);
