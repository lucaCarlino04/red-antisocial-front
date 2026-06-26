import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle } from "lucide-react";

export type Post = {
  _id: string;
  description: string;
  user: { _id: string; nickName: string };
  tags: { _id: string; name: string }[];
  images: string[];
  fechaPublicacion: string;
  comments: number;
};

export const mockPosts: Post[] = [
  {
    _id: "1",
    description:
      "Hoy me quedé en casa en lugar de ir a la reunión. Fue la mejor decisión de mi vida.",
    user: { _id: "u1", nickName: "silencioso99" },
    tags: [
      { _id: "t1", name: "introvertido" },
      { _id: "t2", name: "random" },
    ],
    images: ["https://picsum.photos/seed/post1/600/400"],
    fechaPublicacion: "2025-06-01T10:00:00Z",
    comments: 3,
  },
  {
    _id: "2",
    description: "Cancelé tres planes seguidos y me siento increíble.",
    user: { _id: "u2", nickName: "antisocial_total" },
    tags: [{ _id: "t1", name: "introvertido" }],
    images: [],
    fechaPublicacion: "2025-06-02T14:30:00Z",
    comments: 7,
  },
  {
    _id: "3",
    description:
      "Mi gato es el único ser vivo con el que quiero interactuar hoy.",
    user: { _id: "u3", nickName: "gatero_solitario" },
    tags: [
      { _id: "t3", name: "gatos" },
      { _id: "t2", name: "random" },
    ],
    images: [
      "https://picsum.photos/seed/post3/600/400",
      "https://picsum.photos/seed/post3b/600/400",
      "https://picsum.photos/seed/post3/600/400",
      "https://picsum.photos/seed/post3b/600/400",
    ],
    fechaPublicacion: "2025-06-03T09:15:00Z",
    comments: 12,
  },
  {
    _id: "4",
    description:
      "Fui al supermercado a las 2am para no cruzarme con nadie. Éxito total.",
    user: { _id: "u1", nickName: "silencioso99" },
    tags: [],
    images: [],
    fechaPublicacion: "2025-06-04T02:45:00Z",
    comments: 0,
  },
];

function tiempoRelativo(fecha: string) {
  const diff = Date.now() - new Date(fecha).getTime();
  const min = Math.floor(diff / 60000);
  const hs = Math.floor(min / 60);
  const dias = Math.floor(hs / 24);
  if (min < 60) return `${min} m`;
  if (hs < 24) return `${hs} h`;
  return `${dias} d`;
}

export default function Inicio() {
  return (
    <section className="max-w-2xl mx-auto p-4 space-y-4">
      {mockPosts.map((post) => (
        <article
          key={post._id}
          className="px-6 py-4 border border-zinc-200 dark:border-gray-800/60 bg-zinc-300 dark:bg-gray-900 rounded-lg"
        >
          <div className="flex flex-col gap-3 flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-center w-full justify-between gap-2">
              <h4 className="font-semibold truncate text-blue-500">
                @{post.user.nickName}
              </h4>
              <span className="text-xs text-zinc-600 dark:text-gray-500">
                hace {tiempoRelativo(post.fechaPublicacion)}
              </span>
            </div>

            {/* Descripción */}
            <p className="tracking-tight">{post.description}</p>

            {/* Imágenes */}
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

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag._id}
                    className="text-xs font-medium px-1.5 py-0.5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-gray-900"
                  >
                    #{tag.name}
                  </span>
                ))}
              </div>
            )}

            <div className="border-b border-zinc-600/50 dark:border-gray-500/50 my-2" />

            {/* Footer */}
            <div className="flex items-center justify-between">
              <Link
                to={`/publicacion/${post._id}`}
                className="flex items-center gap-1 text-zinc-600 dark:text-gray-500 hover:text-black dark:hover:text-white transition-colors"
              >
                <MessageCircle size={16} />

                {post.comments > 0 && (
                  <span className="text-sm">{post.comments} comentarios</span>
                )}
              </Link>

              <Link
                to={`/publicacion/${post._id}`}
                className="inline-flex items-center gap-1 text-sm text-zinc-600 dark:text-gray-500 hover:text-black dark:hover:text-white transition-colors"
              >
                Ver más <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
