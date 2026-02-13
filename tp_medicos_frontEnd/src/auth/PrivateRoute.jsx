import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

// Este componente sirve para proteger rutas, solo deja pasar si hay usuario logueado.
// Si no hay usuario, redirige a la pantalla de la landing.
// Si se pasa un 'role' y el usuario no tiene ese rol, lo manda a la página principal.
// Se usa así: <PrivateRoute><ComponenteSoloParaAdmin /></PrivateRoute>
export default function PrivateRoute({ children, role }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/" />;

  if (role) {
      // Si hay rol requerido y el usuario no lo cumple, lo manda al inicio.
    const userRole = user.role || user.rol || user?.roleName || null;
    if (userRole !== role) return <Navigate to="/" />;
  }

  // Si todo está bien, muestra los hijos (el componente protegido).
  return children;
}