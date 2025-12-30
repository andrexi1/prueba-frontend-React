import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function Login() {
  const { login, loading } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    setError("");

    const result = await login(data.username, data.password);

    if (!result.success) {
      setError(result.message);
    }
    // ❌ NO navigate()
    // AppRoutes se encarga de redirigir
  };

  return (
    <div style={{ maxWidth: 400, margin: "100px auto" }}>
      <h2>Iniciar sesión</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Usuario</label>
          <input
            type="email"
            {...register("username", { required: "El usuario es requerido" })}
          />
          {errors.username && <p>{errors.username.message}</p>}
        </div>

        <div>
          <label>Contraseña</label>
          <input
            type="password"
            {...register("password", { required: "La contraseña es requerida" })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Ingresando..." : "Ingresar"}
        </button>
      </form>
    </div>
  );
}
