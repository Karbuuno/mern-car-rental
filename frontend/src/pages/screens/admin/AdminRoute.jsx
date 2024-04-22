import { Navigate, Outlet } from "react-router-dom";
import { UseContext } from "../../../components/context/AuthContext";

const AdminRoute = () => {
  const { user } = UseContext();
  return user && user.isAdmin ? <Outlet /> : <Navigate to='/login' replace />;
};
export default AdminRoute;
