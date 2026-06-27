import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle } from "lucide-react";
import type { Post } from "../types/Post";
import { tiempoRelativo } from "../utils/tiempoRelativo";

interface PostCardProps {
  post: Post;
  cantidadComentarios?: number;
  conComentarios?: Boolean;
}

export default function PostCard({
  post,
  cantidadComentarios = 0,
  conComentarios = true,
}: PostCardProps) {
  return (
    <article className="px-6 py-4 border border-zinc-200 dark:border-gray-800/60 bg-zinc-300 dark:bg-gray-900 rounded-lg">
      <div className="flex flex-col gap-3 flex-1 min-w-0">
        <div className="flex items-center w-full justify-between gap-2">
          <h4 className="font-semibold truncate text-blue-500">
            @{post.user.nickName}
          </h4>
          <span className="text-xs text-zinc-600 dark:text-gray-500">
            hace {tiempoRelativo(post.fechaPublicacion)}
          </span>
        </div>

        <p className="tracking-tight">{post.description}</p>

        {post.images.length > 0 && (
          <div
            className={`grid gap-1 rounded-lg overflow-hidden ${post.images.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}
          >
            {post.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`imagen ${i + 1}`}
                className="w-full object-cover max-h-72"
              />
            ))}
          </div>
        )}

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag._id}
                className="text-xs font-medium px-1.5 py-0.5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-gray-900"
              >
                #{tag.description}
              </span>
            ))}
          </div>
        )}

        <div className="border-b border-zinc-600/50 dark:border-gray-500/50 my-2" />

        {conComentarios && (
          <div className="flex items-center justify-between">
            <Link
              to={`/publicacion/${post._id}`}
              className="flex items-center gap-1 text-zinc-600 dark:text-gray-500 hover:text-black dark:hover:text-white transition-colors"
            >
              <MessageCircle size={16} />
              {cantidadComentarios > 0 && (
                <span className="text-sm">
                  {cantidadComentarios}
                  {cantidadComentarios === 1 ? " comentario" : " comentarios"}
                </span>
              )}
            </Link>

            <Link
              to={`/publicacion/${post._id}`}
              className="inline-flex items-center gap-1 text-sm text-zinc-600 dark:text-gray-500 hover:text-black dark:hover:text-white transition-colors"
            >
              Ver más <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>
    </article>
  );
}
