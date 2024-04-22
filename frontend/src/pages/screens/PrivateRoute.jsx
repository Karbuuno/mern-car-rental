import { UseContext } from "@/components/context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { user } = UseContext();
  return user ? <Outlet /> : <Navigate to='/login' replace />;
};
export default PrivateRoute;
