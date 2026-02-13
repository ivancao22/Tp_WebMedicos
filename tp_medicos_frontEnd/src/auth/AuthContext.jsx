import { createContext, useContext, useState, useRef, useEffect } from "react";
import users from "../mock/User"; // mocks actuales
import { USE_API } from "../services/config";

// cuando USE_API=true usamos estas funciones que ya creaste
import { login as apiLogin, logout as apiLogout, getUser as apiGetUser } from "../services/authServices";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const LOCAL_USER_KEY = "medico_app_user"; // clave usada por el mock (fall back)

export function AuthProvider({ children }) {
  // Inicializamos el estado según USE_API:
  const [user, setUser] = useState(() => {
    if (USE_API) {
      // authService.getUser() ya devuelve objeto o null
      try {
        return apiGetUser();
      } catch (e) {
        return null;
      }
    } else {
      const stored = localStorage.getItem(LOCAL_USER_KEY);
      return stored ? JSON.parse(stored) : null;
    }
  });

  const logoutTimerRef = useRef();

  // Login — si USE_API true => llamamos a la API; si no => usamos el mock actual
  const login = async ({ username, password }) => {
    if (USE_API) {
      try {
        const data = await apiLogin(username, password);
        // apiLogin guarda token y user en localStorage desde authService
        const userFromApi = data.user || data.user; // por seguridad
        setUser(userFromApi || apiGetUser() || null);
        setLogoutTimer();
        return { status: 200 };
      } catch (err) {
        const status = err?.response?.status || 500;
        const message = err?.response?.data?.error || "Usuario o contraseña incorrectos";
        return { status, message };
      }
    } else {
      // comportamiento mock existente (no tocar)
      const foundUser = users.find(
        u =>
          (u.nombre === username || u.email === username) &&
          u.password === password
      );
      if (foundUser) {
        setUser(foundUser);
        localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(foundUser));
        setLogoutTimer();
        return { status: 200 };
      }
      return { status: 401, message: "Usuario o contraseña incorrectos" };
    }
  };

  // Logout — si USE_API true delegamos a authService.logout
  const logout = () => {
    if (USE_API) {
      try {
        apiLogout();
      } catch (e) {
        // ignore
      }
    } else {
      localStorage.removeItem(LOCAL_USER_KEY);
    }
    setUser(null);
    if (logoutTimerRef.current) {
      clearTimeout(logoutTimerRef.current);
      logoutTimerRef.current = null;
    }
  };

  const setLogoutTimer = () => {
    if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
    logoutTimerRef.current = setTimeout(() => {
      setUser(null);
      if (!USE_API) localStorage.removeItem(LOCAL_USER_KEY);
      // si USE_API, authService.logout ya limpia token/user
      logoutTimerRef.current = null;
      alert("Por seguridad, tu sesión ha sido cerrada automáticamente después de 12 horas.");
    }, 43200000); // 12 horas
  };

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