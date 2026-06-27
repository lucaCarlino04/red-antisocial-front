import { Send } from "lucide-react";

export default function ComentarioForm() {
  return (
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
  );
}
