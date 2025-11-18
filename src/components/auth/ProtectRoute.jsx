import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute({ role }) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!role) return <Outlet />; // Si la ruta NO ocupa rol

  const userHasRole = role == (user.roleName);

  if (userHasRole) {
      return <Outlet />;
  } else {
      return <Navigate to="/home" replace />; 
  }
}