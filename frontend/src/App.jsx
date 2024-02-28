import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Outlet } from "react-router-dom";
import Home from "./pages/screens/HomePage.jsx";

function App() {
  return (
    <>
      <main className=' '>
        <Outlet />
      </main>
    </>
  );
}

export default App;
