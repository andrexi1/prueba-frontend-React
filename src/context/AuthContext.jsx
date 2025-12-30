import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token");
  });
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem("token");
      setIsAuthenticated(false);
    }
  }, [token]);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const response = await api.post(
        "https://dev.apinetbo.bekindnetwork.com/api/Authentication/Login",
        credentials
      );
      console.log("Respuesta login:", response.data);

      const accessToken = response.data?.token || response.data?.accessToken;
      setToken(accessToken);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: "Credenciales inválidas",
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
