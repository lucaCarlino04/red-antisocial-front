import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MessageCircle, Send } from "lucide-react";
import { useAuth } from "../context/AuthContext";

type Post = {
  _id: string;
  description: string;
  user: { _id: string; nickName: string };
  tags: { _id: string; name: string }[];
  images: string[];
  fechaPublicacion: string;
  comments: number;
};

type Comment = {
  _id: string;
  text: string;
  user: { _id: string; nickName: string };
  post: string;
  fechaPublicacion: string;
  isVisible: boolean;
};

const mockPosts: Post[] = [
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

const mockComments: Comment[] = [
  {
    _id: "c1",
    text: "jajaja re yo",
    user: { _id: "u2", nickName: "antisocial_total" },
    post: "1",
    fechaPublicacion: "2025-06-01T11:00:00Z",
    isVisible: true,
  },
  {
    _id: "c2",
    text: "me pasó exactamente eso",
    user: { _id: "u3", nickName: "gatero_solitario" },
    post: "1",
    fechaPublicacion: "2025-06-01T12:00:00Z",
    isVisible: true,
  },
  {
    _id: "c3",
    text: "los gatos mandan",
    user: { _id: "u1", nickName: "silencioso99" },
    post: "3",
    fechaPublicacion: "2025-06-03T10:00:00Z",
    isVisible: true,
  },
];

function tiempoRelativo(fecha: string) {
  const diff = Date.now() - new Date(fecha).getTime();
  const min = Math.floor(diff / 60000);
  const hs = Math.floor(min / 60);
  const dias = Math.floor(hs / 24);
  if (min < 60) return `${min}m`;
  if (hs < 24) return `${hs}h`;
  return `${dias}d`;
}

export default function DetallePost() {
  const { id } = useParams<{ id: string }>();
  const { usuario } = useAuth();

  const post = mockPosts.find((p) => p._id === id);
  const comentarios = [
    ...mockComments.filter((c) => c.post === id && c.isVisible),
  ];

  if (!post) {
    return (
      //Poner pagina 404
      <p className="text-zinc-600 dark:text-gray-500">
        No existe la publicacion
      </p>
    );
  }

  return (
    <section className="mx-auto max-w-2xl p-4 space-y-6">
      {/* Volver */}
      <Link
        to="/"
        className="inline-flex items-center gap-1 text-sm font-medium text-zinc-600 dark:text-gray-500 hover:text-black dark:hover:text-white transition-colors"
      >
        <ArrowLeft size={16} /> Volver al feed
      </Link>

      {/* Post */}
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

          <div className="border-b border-zinc-600/50 dark:border-gray-500/50 my-2" />

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
        </div>
      </article>

      {/* Comentarios */}
      <section className="space-y-4">
        <div className=" flex items-center gap-2">
          <MessageCircle size={18} />
          <h2 className="font-display text-lg font-semibold ">
            Comentarios ({comentarios.length})
          </h2>
        </div>

        {/* Formulario o aviso de login */}
        {usuario ? (
          <form className="mb-6 space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Escribí un comentario..."
                maxLength={300}
                className="flex-1 rounded-lg border px-3 py-2 border-zinc-200 dark:border-gray-800/60 bg-zinc-300/20 dark:bg-gray-900/20 placeholder:text-zinc-400/60 dark:placeholder:text-gray-600/60 outline-none focus:outline-solid focus:outline-2 focus:outline-blue-500/80"
              />
              <button
                type="submit"
                className="flex items-center gap-1.5 rounded-lg bg-blue-500 px-4 py-2.5 font-semibold text-ink transition disabled:opacity-60 text-white"
              >
                <Send size={16} />
                <h4 className="hidden sm:inline">Enviar</h4>
              </button>
            </div>
          </form>
        ) : (
          <div className="rounded-lg border border-dashed border-zinc-200 dark:border-gray-800/60 p-4 text-center text-sm text-zinc-400 dark:text-gray-600 bg-zinc-300/20 dark:bg-gray-900/20">
            <Link to="/iniciar" className="text-blue-500 hover:underline">
              Iniciá sesión
            </Link>{" "}
            para dejar un comentario.
          </div>
        )}

        {/* Lista de comentarios */}
        {comentarios.length === 0 ? (
          <p className="text-sm text-zinc-600 dark:text-gray-500">
            Nadie comentó todavía. Sé el primero.
          </p>
        ) : (
          <ul className="space-y-2">
            {comentarios.map((c) => (
              <li
                key={c._id}
                className="rounded-lg border p-4 border-zinc-200 dark:border-gray-800/60 bg-zinc-300 dark:bg-gray-900 space-y-1"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-blue-500 font-semibold text-sm">
                    @{c.user.nickName}
                  </h4>
                  <span className="text-xs">
                    {tiempoRelativo(c.fechaPublicacion)}
                  </span>
                </div>
                <p className="text-sm">{c.text}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </section>
  );
}
