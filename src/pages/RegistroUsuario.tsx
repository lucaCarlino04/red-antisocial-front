import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { crearUsuario } from "../services/UsuarioService";
import type { CamposFormulario } from "../types/FormularioRegistro";
import type { ErroresRegistro } from "../types/ErroresRegistro";

export default function RegistroUsuario() {

  const navigate = useNavigate();

  const email_regex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const name_regex: RegExp = /^[a-záéíóúüñA-ZÁÉÍÓÚÜÑ\s'-]{2,}$/;
  const name_min_length: number = 4;
  const nickname_min_length: number = 4;
  const passCorrect: string = "123456";

  const [errorServidor, setErrorServidor] = useState<string>("");

  const [errores, setErrores] = useState<Partial<ErroresRegistro>>({
    nombre: "",
    apellido: "",
    nickname: "",
    email: "",
    contraseña: ""
  })

  const [formulario, setFormulario] = useState<CamposFormulario>({
    nombre: "",
    apellido: "",
    nickname: "",
    email: "",
    contraseña: ""
  })

  function completandoRegistro(e: any) {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
    setErrores({ ...errores, [e.target.name]: "" })
  }

  async function enviandoInformacion(e: any) {
    e.preventDefault();
    const erroresActuales: Partial<ErroresRegistro> = {};

    if (formulario.nombre.length < name_min_length) {
      erroresActuales.nombre = "El nombre no es correcto"
    } else if (!name_regex.test(formulario.nombre)) {
      erroresActuales.nombre = "El nombre no tiene formato valido"
    }

    if (formulario.apellido.length <= 0) {
      erroresActuales.apellido = "El apellido es obligatorio"
    } else if (!name_regex.test(formulario.apellido)) {
      erroresActuales.apellido = "El apellido no tiene formato valido"
    }

    if (formulario.nickname.length < nickname_min_length) {
      erroresActuales.nickname = "El nombre de usuario no es valido"
    }

    if (formulario.email.length <= 0) {
      erroresActuales.email = "El Email es obligatorio"
    } else if (!email_regex.test(formulario.email)) {
      erroresActuales.email = "El Email no tiene formato valido"
    }

    if (formulario.contraseña !== passCorrect) {
      erroresActuales.contraseña = "La contraseña no tiene la cantidad de caracteres requeridos"
    }

    setErrores(erroresActuales);

    if (Object.keys(erroresActuales).length > 0) {
      return;
    }

    try {
      await crearUsuario(formulario.nickname);
      navigate("/iniciar");
    } catch (err) {
      setErrorServidor(err instanceof Error ? err.message : "Error inesperado");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Registro</h1>
          <p className="mt-2">Completa los campos para continuar:</p>
        </div>

        {errorServidor && (
          <div className="bg-red-50 border border-red-300 text-red-700 text-sm rounded-md px-4 py-3 mb-4">
            {errorServidor}
          </div>)
        }

        <form onSubmit={enviandoInformacion} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="flex flex-col gap-1">
              <span>{errores.nombre ? errores.nombre : "Nombre"}</span>
              <input
                id="nombre"
                type="text"
                name="nombre"
                placeholder="Nombre"
                className="w-full rounded-md p-2 border transition border-2"
                value={formulario.nombre}
                onChange={completandoRegistro}
              />
            </label>
            <label className="flex flex-col gap-1">
              <span>{errores.apellido ? errores.apellido : "Apellido"}</span>
              <input
                id="apellido"
                type="text"
                name="apellido"
                placeholder="Apellido"
                className="w-full rounded-md p-2 border transition border-2"
                value={formulario.apellido}
                onChange={completandoRegistro}
              />
            </label>
          </div>
          <label className="flex flex-col gap-1">
            <span>{errores.nickname ? errores.nickname : "Nickname"}</span>
            <input
              id="nickname"
              type="text"
              name="nickname"
              placeholder="Nickname"
              className="w-full rounded-md p-2 border transition border-2"
              value={formulario.nickname}
              onChange={completandoRegistro}
            />
          </label>
          <label className="flex flex-col gap-1">
            <span>{errores.email ? errores.email : "Email"}</span>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Email"
              className="w-full rounded-md p-2 border transition border-2"
              value={formulario.email}
              onChange={completandoRegistro}
            />
          </label>
          <label className="flex flex-col gap-1">
            <span>{errores.contraseña ? errores.contraseña : "Contraseña"}</span>
            <input
              id="contraseña"
              type="password"
              name="contraseña"
              placeholder="Contraseña"
              className="w-full rounded-md p-2 border transition border-2"
              value={formulario.contraseña}
              onChange={completandoRegistro}
            />
          </label>
          <button type="submit" className="
            w-full
            mt-2
            py-3
            rounded-md
            bg-emerald-700 text-white hover:bg-emerald-800 transition
            font-semibold
            active:bg-bg-emerald-300
            active:scale-95">
            Registrarse
          </button>
        </form>
        <div className="mt-4 text-center">
          <p>¿Ya tenes una cuenta?</p>
          <button type="button" className="
            w-full
            mt-3
            py-3
            rounded-md
            font-semibold
            active:bg-emerald-800
            bg-emerald-700 text-white hover:bg-emerald-800 transition
            active:scale-95"
            onClick={() => navigate("/iniciar")}>
            Inicia sesión
          </button>
        </div>
      </div>
    </div>
  );
}
