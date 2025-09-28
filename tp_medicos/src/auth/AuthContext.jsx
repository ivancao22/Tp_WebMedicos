import { createContext, useContext, useState, useRef, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const USER_KEY = "medico_app_user";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    // Recupera user guardado si existe
    const stored = localStorage.getItem(USER_KEY);
    return stored ? JSON.parse(stored) : null;
  });
  const logoutTimerRef = useRef();

  // Solo staff puede loguear
  const login = ({ username, password }) => {
    let validUser = null;
    if (username === "admin" && password === "admin1234") {
      validUser = { username, role: "admin" };
    }
    if (username === "secretaria" && password === "abcd1234") {
      validUser = { username, role: "secretaria" };
    }
    if (validUser) {
      setUser(validUser);
      localStorage.setItem(USER_KEY, JSON.stringify(validUser));
      setLogoutTimer(); // inicia timer
      return { status: 200 };
    }
    return { status: 401, message: "Usuario o contraseña incorrectos" };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(USER_KEY);
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
      localStorage.removeItem(USER_KEY);
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