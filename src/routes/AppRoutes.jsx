import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import { useAuth } from "../context/AuthContext";
import CreateAction from "../pages/CreateAction";

export default function AppRoutes() {
    const { token } = useAuth();

    return (
        <Routes>
            <Route
                path="/login"
                element={token ? <Navigate to="/" /> : <Login />}
            />

            <Route
                path="/"
                element={token ? <Dashboard /> : <Navigate to="/login" />}
            />

            <Route path="*" element={<Navigate to="/" />} />

            <Route
                path="/crear-accion"
                element={token ? <CreateAction /> : <Navigate to="/login" />}
            />
        </Routes>
    );
}
