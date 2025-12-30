import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Dashboard() {
  const [acciones, setAcciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAcciones = async () => {
      try {
        setLoading(true);
        const response = await api.get(
          "/api/v1/actions/admin-list?pageNumber=1&pageSize=10"
        );

        setAcciones(response.data?.items || response.data || []);
      } catch (err) {
        setError("Error al cargar las acciones");
      } finally {
        setLoading(false);
      }
    };

    fetchAcciones();
  }, []);

  if (loading) return <p>Cargando acciones...</p>;
  if (error) return <p>{error}</p>;
  if (!acciones.length) return <p>No hay acciones disponibles</p>;

  return (
    <div>
      <h2>Dashboard</h2>
      <ul>
        {acciones.map((accion, index) => (
          <li key={accion.id || index}>
            {accion.name || accion.title || "Acción sin nombre"}
          </li>
        ))}
      </ul>
    </div>
  );
}
