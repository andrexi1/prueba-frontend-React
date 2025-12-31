import { createContext, useContext, useState } from "react";
import { authApi } from "../api/axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(false);

  const login = async (username, password) => {
    try {
      setLoading(true);
      const response = await authApi.post("/api/Authentication/Login", {
        username,
        password,
      });
      const accessToken = response.data;
      localStorage.setItem("token", accessToken);
      setToken(accessToken);
      return { success: true };
    } catch (error) {
      return { success: false, message: "Credenciales inválidas" };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}