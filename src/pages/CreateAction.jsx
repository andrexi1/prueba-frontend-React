import { useForm } from "react-hook-form";
import { useState } from "react";
import api from "../api/axios";

export default function CreateAction() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setError("");
      setMessage("");

      await api.post("/api/v1/actions", data);

      setMessage("Acción creada correctamente");
      reset();
    } catch (err) {
      setError("Error al crear la acción");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "40px auto" }}>
      <h2>Crear Acción</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Nombre</label>
          <input
            {...register("name", { required: "El nombre es obligatorio" })}
          />
          {errors.name && <p>{errors.name.message}</p>}
        </div>

        <div>
          <label>Descripción</label>
          <textarea
            {...register("description", {
              required: "La descripción es obligatoria",
            })}
          />
          {errors.description && <p>{errors.description.message}</p>}
        </div>

        {message && <p style={{ color: "green" }}>{message}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Creando..." : "Crear acción"}
        </button>
      </form>
    </div>
  );
}
