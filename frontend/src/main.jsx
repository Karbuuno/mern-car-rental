import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthContextProvider } from "./components/context/AuthContext.jsx";
import Home from "./pages/screens/HomePage.jsx";
import LoginForm from "./components/login/LoginForm.jsx";
import Register from "./components/register/Register.jsx";
import Cars from "./pages/screens/CarsScreen.jsx";
import CarScreen from "./pages/screens/CarDetailsScreen.jsx";
import Search from "./pages/screens/Search.jsx";
import Location from "./pages/screens/Location.jsx";
import Checkout_session from "./pages/screens/Checkout_session.jsx";
import CarList from "./pages/screens/admin/CarList.jsx";
import AdminRoute from "./components/AdminRoute.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<LoginForm />} />
      <Route path='/register' element={<Register />} />
      <Route path='/cars' element={<Cars />} />

      <Route path='/car/:id' element={<CarScreen />} />

      <Route path='/cars/search/:location' element={<Location />} />
      <Route path='/checkout_session' element={<Checkout_session />} />
      <Route path='' element={<AdminRoute />}>
        <Route path='/admin/carlist' element={<CarList />} />
      </Route>
    </Route>
  )
);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
