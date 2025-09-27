import { createContext, useContext, useState, useRef, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { username, role }
  const logoutTimerRef = useRef();

  // Solo staff puede loguear
  const login = ({ username, password }) => {
    if (username === "admin" && password === "admin1234") {
      setUser({ username, role: "admin" });
      setLogoutTimer(); // inicia timer
      return { status: 200 };
    }
    if (username === "secretaria" && password === "abcd1234") {
      setUser({ username, role: "secretaria" });
      setLogoutTimer(); // inicia timer
      return { status: 200 };
    }
    return { status: 401, message: "Usuario o contraseña incorrectos" };
  };

  const logout = () => {
    setUser(null);
    if (logoutTimerRef.current) {
      clearTimeout(logoutTimerRef.current);
      logoutTimerRef.current = null;
    }
  };

  // Timer para cerrar sesión a las 12 horas (43200000 ms)
  const setLogoutTimer = () => {
    if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
    logoutTimerRef.current = setTimeout(() => {
      setUser(null);
      logoutTimerRef.current = null;
      alert("Por seguridad, tu sesión ha sido cerrada automáticamente después de 12 horas.");
    }, 43200000);
  };

  // Limpia timer si el componente se desmonta
  useEffect(() => {
    return () => {
      if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}