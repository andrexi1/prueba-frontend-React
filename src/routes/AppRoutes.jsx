import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  return <h2>Página de Login</h2>;
}

function Dashboard() {
  return <h2>Dashboard</h2>;
}

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
