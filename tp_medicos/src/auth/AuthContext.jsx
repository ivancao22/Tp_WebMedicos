import { createContext, useContext, useState, useRef, useEffect } from "react";
import { loginApi } from "../services/api";

const AuthContext = createContext();

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => useContext(AuthContext);

const USER_KEY = "medico_app_user";   // datos del usuario
const TOKEN_KEY = "medico_app_token"; // token JWT

export function AuthProvider({ children }) {
  // Estado para el usuario logueado, lo recupera de localStorage si está guardado.
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem(USER_KEY);
      const storedToken = localStorage.getItem(TOKEN_KEY);
      if (storedUser && storedToken) {
        return JSON.parse(storedUser);
      }
      return null;
    } catch {
      return null;
    }
  });

  const logoutTimerRef = useRef();

  // 🔴 login real contra el backend
  const login = async ({ username, password /*, remember */ }) => {
    const result = await loginApi(username, password);

    if (result.status === 200 && result.token) {
      // Podés guardar más info si el back te la devuelve
      const userData = { username };

      setUser(userData);
      localStorage.setItem(USER_KEY, JSON.stringify(userData));
      localStorage.setItem(TOKEN_KEY, result.token);

      setLogoutTimer(); // Arranca el timer de cierre automático de sesión.

      return { status: 200 };
    }

    return {
      status: result.status || 401,
      message: result.message || "Usuario o contraseña incorrectos",
    };
  };

  // Cierra la sesión y limpia todo lo relacionado al usuario.
  const logout = () => {
    setUser(null);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
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
      localStorage.removeItem(TOKEN_KEY);
      logoutTimerRef.current = null;
      alert("Por seguridad, tu sesión ha sido cerrada automáticamente después de 12 horas.");
    }, 43200000); // 12 horas
  };

  // Limpia el timer al desmontar
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
