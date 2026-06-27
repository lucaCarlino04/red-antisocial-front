import { useEffect, useState } from "react";
import type { Post } from "../types/Post";
import { obtenerComentariosPorPost } from "../services/ComentarioService";
import { obtenerPosts } from "../services/PostService";
import Error from "../components/Error";
import Loader from "../components/Loader";
import PostCard from "../components/PostCard";

export default function Inicio() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [cantidadComentarios, setCantidadComentarios] = useState<
    Record<string, number>
  >({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function obtenerData() {
      try {
        const dataPosts = await obtenerPosts();
        setPosts(dataPosts);
        const contadorComentarios: Record<string, number> = {};
        for (const post of dataPosts) {
          const comentarios = await obtenerComentariosPorPost(post._id);
          contadorComentarios[post._id] = comentarios.length;
        }
        setCantidadComentarios(contadorComentarios);
      } catch {
        setError(
          "No se pudo cargar el feed, hubo un problema con la base de datos",
        );
      } finally {
        setLoading(false);
      }
    }
    obtenerData();
  }, []);

  if (loading) return <Loader />;

  if (error) return <Error mensaje={error} />;

  return (
    <section className="max-w-2xl mx-auto p-4 space-y-4">
      {posts.map((post) => (
        <PostCard
          key={post._id}
          post={post}
          cantidadComentarios={cantidadComentarios[post._id]}
        />
      ))}
    </section>
  );
}
