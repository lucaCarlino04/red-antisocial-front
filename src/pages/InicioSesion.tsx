import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function InicioSesion() {
  
  const navigate = useNavigate();
  const { iniciar, isAuthenticated } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const loginOk = iniciar({
      email,
      password,
    });

    if (loginOk) {
      setError("");
      navigate("/inicio");
    } else {
      setError("Email o contraseña invalidos");
    }
  }

  if (isAuthenticated) {
    return <Navigate to="/mi-perfil" replace />;
  }
  
  
  return <>
      <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Iniciar sesión</h1>
          <p className="mt-2">
            Ingresa tus credenciales para continuar.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="correo@ejemplo.com"
              className="w-full border rounded-md p-2"
               value={email}
               onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              placeholder="********"
              className="w-full border rounded-md p-2"
               value={password}
               onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full border rounded-md py-2"
          >
            Ingresar
          </button>

        </form>
        <div className="mt-6 text-center">
          <p>
            ¿No tienes una cuenta?
          </p>

          <button className="mt-2 underline">
            Registrarse
          </button>
        </div>

      </div>
    </div>
  </>;
  }

