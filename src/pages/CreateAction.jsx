import { useForm } from "react-hook-form";
import { useState } from "react";
import { actionsApi } from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function CreateAction() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    setError("");
    setMessage("");

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("status", data.status === "active" ? "1" : "0");
    formData.append("color", data.color || "#1e1b4b");
    if (data.icon && data.icon[0]) {
      formData.append("icon", data.icon[0]);
    } else {
      setError("Debes seleccionar un icono (imagen)");
      setLoading(false);
      return;
    }

    try {
      await actionsApi.post("/api/v1/actions/admin-add", formData);
      setMessage("¡Acción creada correctamente!");
      reset();
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      setError("Error al crear la acción. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px", background: "#f8fafc", minHeight: "100vh" }}>
      {/* Botón Volver + Título */}
      <div style={{
        display: "flex",
        alignItems: "center",
        marginBottom: "30px",
        gap: "20px",
      }}>
        <button
          onClick={() => navigate("/")}
          style={{
            background: "#6c757d",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          ← Volver al Dashboard
        </button>
        <h1 style={{ margin: 0, color: "#1e1b4b" }}>Crear Nueva Acción</h1>
      </div>

      {/* Formulario */}
      <div style={{
        background: "white",
        padding: "40px",
        borderRadius: "16px",
        maxWidth: "700px",
        boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
      }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>
              Nombre *
            </label>
            <input
              {...register("name", { required: "El nombre es obligatorio" })}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                fontSize: "16px",
              }}
            />
            {errors.name && <p style={{ color: "red", marginTop: "5px" }}>{errors.name.message}</p>}
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>
              Descripción *
            </label>
            <textarea
              {...register("description", { required: "La descripción es obligatoria" })}
              rows="4"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                fontSize: "16px",
              }}
            />
            {errors.description && <p style={{ color: "red", marginTop: "5px" }}>{errors.description.message}</p>}
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>
              Estado *
            </label>
            <select
              {...register("status", { required: "Selecciona un estado" })}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                fontSize: "16px",
              }}
            >
              <option value="">-- Seleccionar --</option>
              <option value="active">Activo</option>
              <option value="inactive">Inactivo</option>
            </select>
            {errors.status && <p style={{ color: "red", marginTop: "5px" }}>{errors.status.message}</p>}
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>
              Color (código hex) *
            </label>
            <input
              type="text"
              {...register("color", { required: "El color es obligatorio" })}
              placeholder="#1e1b4b"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                fontSize: "16px",
              }}
            />
            {errors.color && <p style={{ color: "red", marginTop: "5px" }}>{errors.color.message}</p>}
          </div>

          <div style={{ marginBottom: "30px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>
              Icono (imagen) *
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("icon", { required: "Debes subir un icono" })}
              style={{ fontSize: "16px" }}
            />
            {errors.icon && <p style={{ color: "red", marginTop: "5px" }}>{errors.icon.message}</p>}
          </div>

          {message && (
            <p style={{ color: "green", fontSize: "18px", fontWeight: "bold", textAlign: "center", marginBottom: "20px" }}>
              {message}
            </p>
          )}

          {error && (
            <p style={{ color: "red", fontSize: "16px", textAlign: "center", marginBottom: "20px" }}>
              {error}
            </p>
          )}

          <div style={{ textAlign: "center" }}>
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: "14px 40px",
                background: "#1e1b4b",
                color: "white",
                border: "none",
                borderRadius: "12px",
                fontSize: "18px",
                fontWeight: "600",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Creando..." : "Crear Acción"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}