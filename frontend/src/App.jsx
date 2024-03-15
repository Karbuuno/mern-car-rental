import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Outlet } from "react-router-dom";
import Home from "./pages/screens/HomePage.jsx";
import Header from "./pages/screens/Header";
import Footer from "./pages/screens/Footer";

function App() {
  return (
    <div className='h-full'>
      <Header />
      <main className=' '>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
