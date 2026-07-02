import type { Usuario } from "../types/Usuario";
import Spinner from "../components/Spinner";

export default function UsuarioPerfil({
  nickName,
  esMiPerfil,
  yaLoSigo,
  toggleFollow,
  loading,
}: {
  nickName: Usuario;
  esMiPerfil: boolean;
  yaLoSigo: boolean;
  toggleFollow: () => void;
  loading: boolean;
}) {
  return (
    <div>
      {/* HEADER PERFIL */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">@{nickName.nickName}</h1>
          <p className="ml-1 dark:text-gray-400 text-gray-600 text-sm">{nickName.description}</p>
        </div>

        <img
          className="w-18 h-18 rounded-full bg-gray-700"
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          alt="Imagen de perfil"
        />
      </div>

      {/* FOLLOWERS / FOLLOWING */}
      <div className="flex gap-4 mt-4 text-sm text-gray-400">
        <p>
          <span className="text-black dark:text-white font-semibold">
            {nickName.followers.length}
          </span>{" "}
          Seguidores
        </p>
        <p>
          <span className="text-black dark:text-white font-semibold">
            {nickName.following.length}
          </span>{" "}
          Siguiendo
        </p>
      </div>

      {/* BOTÓN FOLLOW / Editar perfil */}
      <div className="mt-5">
        {!esMiPerfil && (
          <button
            onClick={toggleFollow}
            disabled={loading}
            className={`group w-full ${
              yaLoSigo
                ? "bg-gray-700 hover:bg-gray-800"
                : "bg-emerald-700 hover:bg-emerald-800"
            } text-white py-2 rounded-full font-semibold transition disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed flex items-center justify-center gap-2`}
          >
            {loading ? (
              <Spinner />
            ) : yaLoSigo ? (
              <>
                <span className="group-hover:hidden">Siguiendo</span>
                <span className="hidden group-hover:inline">
                  Dejar de seguir
                </span>
              </>
            ) : (
              "Seguir"
            )}
          </button>
        )}
      </div>

      {/* SEPARADOR */}
      <div className="border-b border-gray-800 my-6" />
    </div>
  );
}
