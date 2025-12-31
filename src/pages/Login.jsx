import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function Login() {
  const { login, loading } = useAuth();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    setError("");
    const result = await login(data.username, data.password);
    if (!result.success) {
      setError(result.message);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "#f8fafc" }}>
      <div style={{ width: "400px", padding: "40px", background: "white", borderRadius: "12px", boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}>
        <h2 style={{ textAlign: "center", marginBottom: "30px" }}>Iniciar sesión</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ marginBottom: "20px" }}>
            <label>Correo</label>
            <input {...register("username", { required: true })} style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ddd" }} />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label>Contraseña</label>
            <input type="password" {...register("password", { required: true })} style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ddd" }} />
          </div>
          {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
          <button type="submit" disabled={loading} style={{ width: "100%", padding: "12px", background: "#1e1b4b", color: "white", border: "none", borderRadius: "8px" }}>
            {loading ? "Entrando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  );
}