import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Dashboard() {
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
    <div style={{ padding: "20px", minHeight: "100vh" }}>
      <h2>Dashboard</h2>

      {loading && <p>Cargando acciones...</p>}
      {error && <p>{error}</p>}

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

      <div
        style={{
          marginTop: 30,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
        }}
      >
        <button
          onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
          disabled={pageNumber === 1}
        >
          Anterior
        </button>

        <span>Página {pageNumber}</span>

        <button onClick={() => setPageNumber((prev) => prev + 1)}>
          Siguiente
        </button>
      </div>
    </div>
  );
}
