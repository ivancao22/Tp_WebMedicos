import { createContext, useContext, useState, useRef, useEffect } from "react";
// Importo de la carpeta mock los usuarios de prueba que cree, mas adelante esto estara en la bd y no sera necesario el mock.
import users from "../mock/User"; 

// Este es el contexto de autenticación, donde se guarda el usuario logueado y las funciones de login/logout.
const AuthContext = createContext();

// Hook personalizado para usar el contexto de autenticación en cualquier parte de la app.
export const useAuth = () => useContext(AuthContext);

const USER_KEY = "medico_app_user"; // Clave para guardar el usuario en localStorage

export function AuthProvider({ children }) {
  // Estado para el usuario logueado, lo recupera de localStorage si está guardado.
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem(USER_KEY);
    return stored ? JSON.parse(stored) : null;
  });

  const logoutTimerRef = useRef();

  // Este método se encarga de validar el usuario y la contraseña, usando los datos del mock.
  // Permite loguear tanto por nombre como por email.
  const login = ({ username, password }) => {
    const foundUser = users.find(
      u =>
        (u.nombre === username || u.email === username) &&
        u.password === password
    );
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem(USER_KEY, JSON.stringify(foundUser));
      setLogoutTimer(); // Arranca el timer de cierre automático de sesión.
      return { status: 200 };
    }
    // Si no se encuentra el usuario, devuelve un mensaje claro.
    return { status: 401, message: "Usuario o contraseña incorrectos" };
  };

  // Esta función cierra la sesión y limpia todo lo relacionado al usuario.
  const logout = () => {
    setUser(null);
    localStorage.removeItem(USER_KEY);
    if (logoutTimerRef.current) {
      clearTimeout(logoutTimerRef.current);
      logoutTimerRef.current = null;
    }
  };

  // Timer para cerrar la sesión automáticamente a las 12 horas (por seguridad).
  const setLogoutTimer = () => {
    if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
    logoutTimerRef.current = setTimeout(() => {
      setUser(null);
      localStorage.removeItem(USER_KEY);
      logoutTimerRef.current = null;
      alert("Por seguridad, tu sesión ha sido cerrada automáticamente después de 12 horas.");
    }, 43200000);
  };

  // Cuando el componente se desmonta, limpia el timer si existe.
  useEffect(() => {
    return () => {
      if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
    };
  }, []);

  // Esto hace que cualquier componente hijo pueda acceder al usuario, login y logout.
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}