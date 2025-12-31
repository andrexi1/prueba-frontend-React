import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import "../styles/dashboard.css";


export default function Dashboard() {
    const { logout } = useAuth();
    const [acciones, setAcciones] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [pageNumber, setPageNumber] = useState(1);
    const pageSize = 10;

    const fetchAcciones = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get(
                `/api/v1/actions/admin-list?pageNumber=${pageNumber}&pageSize=${pageSize}`
            );

            setAcciones(response.data?.items || response.data || []);
        } catch (err) {
            setError("Error al cargar las acciones");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAcciones();
    }, [pageNumber]);

    return (
        <div className="dashboard">
            <h2>Dashboard</h2>

            {/* MENSAJES */}
            {loading && <p>Cargando acciones...</p>}

            {error && (
                <div className="error-box">
                    <p>No fue posible cargar las acciones.</p>
                    <p>Intenta nuevamente más tarde.</p>
                </div>
            )}

            {!loading && !error && acciones.length === 0 && (
                <p>No hay acciones disponibles</p>
            )}

            {!loading && !error && acciones.length > 0 && (
                <ul>
                    {acciones.map((accion, index) => (
                        <li key={accion.id || index}>
                            {accion.name || accion.title || "Acción sin nombre"}
                        </li>
                    ))}
                </ul>
            )}

            {/*  CONTROLES — FUERA DE TODAS LAS CONDICIONES */}
            <div className="dashboard-controls">
                <button
                    onClick={() => setPageNumber((p) => Math.max(p - 1, 1))}
                    disabled={pageNumber === 1}
                >
                    Anterior
                </button>

                <span>Página {pageNumber}</span>

                <button onClick={() => setPageNumber((p) => p + 1)}>
                    Siguiente
                </button>

                <button className="logout-btn" onClick={logout}>
                    Cerrar sesión
                </button>
            </div>
        </div>
    );

}
