import { useEffect, useState } from "react";
import { actionsApi } from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [acciones, setAcciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const fetchAcciones = async () => {
    setLoading(true);
    setError(false);

    try {
      const response = await actionsApi.get("/api/v1/actions/admin-list", {
        params: {
          pageNumber: currentPage,
          pageSize: pageSize,
        },
      });

      // El backend devuelve { data: [...] }
      const items = response.data.data || response.data || [];
      setAcciones(items);
    } catch (err) {
      console.error("Error al cargar acciones:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAcciones();
  }, [currentPage]);

  // Refrescar al cargar la página
  useEffect(() => {
    fetchAcciones();
  }, []);

  return (
    <div style={{ padding: "40px", background: "#f8fafc", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{
        background: "white",
        padding: "30px",
        borderRadius: "16px",
        boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
        marginBottom: "40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <h1 style={{ margin: 0, color: "#1e1b4b", fontSize: "32px" }}>
          Dashboard de Acciones
        </h1>

        <div style={{ display: "flex", gap: "16px" }}>
          <button
            onClick={() => navigate("/crear-accion")}
            style={{
              background: "#4338ca",
              color: "white",
              padding: "14px 28px",
              border: "none",
              borderRadius: "12px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            + Nueva Acción
          </button>

          <button
            onClick={logout}
            style={{
              background: "#dc3545",
              color: "white",
              padding: "14px 28px",
              border: "none",
              borderRadius: "12px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Cerrar Sesión
          </button>
        </div>
      </div>

      {/* Contenido principal */}
      <div style={{
        background: "white",
        borderRadius: "16px",
        padding: "40px",
        boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
        minHeight: "400px",
      }}>
        {/* Estado: Cargando */}
        {loading && (
          <div style={{ textAlign: "center", padding: "60px" }}>
            <p style={{ fontSize: "20px", color: "#666" }}>
              Cargando acciones...
            </p>
          </div>
        )}

        {/* Estado: Error de carga */}
        {error && !loading && (
          <div style={{ textAlign: "center", padding: "60px" }}>
            <p style={{ color: "#dc3545", fontSize: "20px", fontWeight: "bold" }}>
              No se pudieron cargar las acciones
            </p>
            <p style={{ color: "#777", margin: "20px 0" }}>
              Puede que no haya conexión o no se hayan creado acciones aún.
            </p>
            <button
              onClick={fetchAcciones}
              style={{
                padding: "12px 24px",
                background: "#1e1b4b",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Reintentar
            </button>
          </div>
        )}

        {/* Estado: No hay acciones */}
        {!loading && !error && acciones.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px" }}>
            <h3 style={{ color: "#555", fontSize: "24px" }}>
              No hay acciones creadas aún
            </h3>
            <p style={{ color: "#777", fontSize: "18px", margin: "20px 0" }}>
              Usa el botón "Nueva Acción" para crear la primera.
            </p>
          </div>
        )}

        {/* Estado: Hay acciones */}
        {!loading && !error && acciones.length > 0 && (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead style={{ background: "#1e1b4b", color: "white" }}>
                <tr>
                  <th style={{ padding: "20px", textAlign: "left" }}>Nombre</th>
                  <th style={{ padding: "20px", textAlign: "left" }}>Estado</th>
                  <th style={{ padding: "20px", textAlign: "left" }}>Descripción</th>
                  <th style={{ padding: "20px", textAlign: "left" }}>Fecha</th>
                  <th style={{ padding: "20px", textAlign: "center" }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {acciones.map((accion) => (
                  <tr key={accion.id} style={{ borderBottom: "1px solid #eee" }}>
                    <td style={{ padding: "20px", fontWeight: "600" }}>{accion.name || "-"}</td>
                    <td style={{ padding: "20px" }}>
                      <span style={{
                        background: accion.status === 1 ? "#28a745" : "#6c757d",
                        color: "white",
                        padding: "8px 16px",
                        borderRadius: "30px",
                      }}>
                        {accion.status === 1 ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                    <td style={{ padding: "20px", color: "#555" }}>
                      {accion.description || "Sin descripción"}
                    </td>
                    <td style={{ padding: "20px", color: "#666" }}>
                      {accion.createdAt ? new Date(accion.createdAt).toLocaleDateString("es-ES") : "-"}
                    </td>
                    <td style={{ padding: "20px", textAlign: "center" }}>
                      <button style={{ fontSize: "20px", margin: "0 8px" }}>✏️</button>
                      <button style={{ fontSize: "20px", margin: "0 8px" }}>🗑️</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}