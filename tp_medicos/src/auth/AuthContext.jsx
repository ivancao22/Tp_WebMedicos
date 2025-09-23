import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { username, role }

  // Solo staff puede loguear
  const login = ({ username, password }) => {
    if (username === "admin" && password === "1234") {
      setUser({ username, role: "admin" });
      return { status: 200 };
    }
    if (username === "secretaria" && password === "abcd") {
      setUser({ username, role: "secretaria" });
      return { status: 200 };
    }
    return { status: 401, message: "Usuario o contraseña incorrectos" };
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}