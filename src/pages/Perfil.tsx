import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import type { Usuario } from "../types/Usuario";
import type { Post } from "../types/Post";

import { obtenerUsuarioPorNickName } from "../services/UsuarioService";

import UsuarioPerfil from "../components/UsuarioPerfil";

export default function Perfil() {
  const { nickName } = useParams<{ nickName: string }>();

  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (!nickName) return;

    async function cargar() {
      const user = await obtenerUsuarioPorNickName(nickName);
      setUsuario(user);
    }

    cargar();
  }, [nickName]);

  if (!usuario) return <p>Cargando...</p>;

  return (
    <div>
      <UsuarioPerfil nickName={usuario} />
    </div>
  );
}