import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import "../styles/login.css";


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

  };

 return (
  <div className="login-container">
    <div className="login-card">
      <h2>Iniciar sesión</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="login-field">
          <label>Correo electrónico</label>
          <input type="email" {...register("username", { required: true })} />
        </div>

        <div className="login-field">
          <label>Contraseña</label>
          <input type="password" {...register("password", { required: true })} />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button className="login-button" disabled={loading}>
          {loading ? "Ingresando..." : "Ingresar"}
        </button>
      </form>
    </div>
  </div>
);

}
