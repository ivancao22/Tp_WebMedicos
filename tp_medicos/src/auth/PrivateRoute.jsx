import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

// Uso: <PrivateRoute><ComponenteSoloParaAdmin /></PrivateRoute>
export default function PrivateRoute({ children, role }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/" />;
  return children;
}