import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import type { Usuario } from "../types/Usuario";
import type { Post } from "../types/Post";

import { obtenerUsuarioPorNickName } from "../services/UsuarioService";
import { obtenerPostsDeUsuario } from "../services/PostService";

import UsuarioPerfil from "../components/UsuarioPerfil";
import PostCard from "../components/PostCard";
import ComponenteAnimado from "../components/ComponenteAnimado";
import { obtenerComentariosPorPost } from "../services/ComentarioService";

export default function Perfil() {
  const { nickName } = useParams<{ nickName: string }>();

  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [cantidadComentarios, setCantidadComentarios] = useState<Record<string, number>>({});
  

  useEffect(() => {
    if (!nickName) return;

    async function cargar() {
      const user = await obtenerUsuarioPorNickName(nickName);
      setUsuario(user);
      const posts = await obtenerPostsDeUsuario(nickName);
      setPosts(posts);
      const contadorComentarios: Record<string, number> = {};
      for (const post of posts) {
        const comentarios = await obtenerComentariosPorPost(post._id);
        contadorComentarios[post._id] = comentarios.length;
      }
      setCantidadComentarios(contadorComentarios);
    }

    cargar();
  }, [nickName]);

  if (!usuario) return <p>Cargando...</p>;

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex justify-center">
      <div className="w-full max-w-xl px-4 py-6">
        <UsuarioPerfil nickName={usuario} />
        
        {posts 
        ? posts.map((post) => (
          <ComponenteAnimado key={post._id}>
            <Link to={`/publicacion/${post._id}`}>
              <PostCard
              post={post}
              cantidadComentarios={cantidadComentarios[post._id] ?? 0}
              />
            </Link>
          </ComponenteAnimado>
        ))
        : <div className="text-gray-500 text-sm">
            Este usuario no ha subido nada todavía...
          </div>
        }
      </div>
    </div>
  );
}
