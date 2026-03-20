import { useCallback, useState } from "react";
import { sesion } from "../../componentes/funciones/sesion";
import UserAvatar from "../../componentes/UserAvatar";

export default function ForoView() {
  sesion();

  const handleBack = useCallback(() => {
    history.back();
  }, []);

  // Estado solo para la demo de UI del compositor
  const [postText, setPostText] = useState("");

  // Mock de posts para la vista (UI únicamente)
  const posts = [
    {
      id: 1,
      author: "U2",
      name: "usuario 2",
      time: "hace 2 h",
      content:
        "¿Alguien tiene recomendaciones de ejercicios suaves para el día 2 del ciclo? Busco algo corto y sin impacto.",
      tags: ["Ejercicio", "Consejos"],
      likes: 0,
      comments: 0,
    },
    {
      id: 2,
      author: "U3",
      name: "Usuario 3",
      time: "ayer",
      content:
        "Comparto una lista de snacks que me ayudan con el antojo sin romper la alimentación: yogurt natural con frutos rojos, almendras y pepino con limón.",
      tags: ["Alimentación"],
      likes: 0,
      comments: 0,
    },
  ];

  return (
    <div className="fixed inset-0 overflow-hidden bg-[#FCE7F3]">
      {/* ===== Background ===== */}
      <div className="pointer-events-none absolute -top-24 left-0 h-[340px] w-full rounded-b-[90px] bg-[#FBCFE8]/90" />
      <div className="pointer-events-none absolute -right-44 top-16 h-[520px] w-[520px] rounded-full bg-[#F9A8D4]/55" />
      <div className="pointer-events-none absolute -bottom-64 -left-56 h-[600px] w-[760px] rounded-full bg-[#FBCFE8]/75" />
      <div className="pointer-events-none absolute bottom-14 right-10 hidden h-[380px] w-[380px] rounded-full border border-white/45 lg:block" />
      <div className="pointer-events-none absolute bottom-5 right-28 hidden h-[260px] w-[260px] rounded-full border border-white/35 lg:block" />

      {/* ===== Content ===== */}
      <div
        className="
          
relative z-[1] isolate flex h-full w-full justify-center
    overflow-y-auto overscroll-contain
    px-6 sm:px-10
    pt-[calc(env(safe-area-inset-top)+16px)]
    pb-[calc(env(safe-area-inset-bottom)+16px)]

        "
      >
        <div className="w-full max-w-[360px] sm:max-w-lg lg:max-w-xl">
          {/* Header (flecha como la que ya te funciona) */}
          <header className="flex items-center gap-3 py-1 mb-4">
            <button
              type="button"
              onClick={handleBack}
              aria-label="Volver"
              className="mb-4 text-xl font-bold text-rose-900 hover:scale-110 transition"
            >
              ←
            </button>

            <h1 className="text-[22px] font-extrabold tracking-tight text-[#0A1128]">
              Foro
            </h1>
          </header>

          {/* filtros de la parte de arriba */}
          <nav className="mb-4 flex items-center gap-2">
            <TabChip active>Populares</TabChip>
            <TabChip>Recientes</TabChip>
            <TabChip>Mis posts</TabChip>
          </nav>

          {/* Compositor de publicación */}
          <section
            className="
              rounded-2xl bg-white/70 ring-1 ring-pink-200/70
              shadow-[0_10px_24px_rgba(251,113,133,0.20)]
              px-4 py-3 mb-5
            "
          >
            <div className="flex items-start gap-3">
              <UserAvatar />
              <form
                className="flex-1"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!postText.trim()) return;
                  setPostText("");
                }}
                autoComplete="off"
              >
                <textarea
                  value={postText}
                  onChange={(e) => setPostText(e.target.value)}
                  placeholder="¿Qué quieres compartir?"
                  rows={3}
                  className="
                    w-full resize-none bg-transparent outline-none
                    text-[14px] text-[#0f172a]
                    placeholder:text-[#0f172a]/50
                  "
                />
                <div className="mt-2 flex items-center justify-between">
                  {/* los # */}
                  <div className="flex flex-wrap gap-2">
                    <TagChip>#Consejos</TagChip>
                    <TagChip>#Ejercicio</TagChip>
                    <TagChip>#Alimentación</TagChip>
                  </div>

                  <button
                    type="submit"
                    disabled={!postText.trim()}
                    className="
                      inline-flex items-center gap-2 rounded-full
                      bg-[#F9A8D4] text-white
                      px-4 py-2 text-sm font-semibold
                      ring-1 ring-pink-200
                      shadow-[0_8px_16px_rgba(251,113,133,0.35)]
                      hover:bg-[#F472B6] transition
                      disabled:opacity-60 disabled:cursor-not-allowed
                    "
                  >
                    <SendIcon className="h-4 w-4" />
                    Publicar
                  </button>
                </div>
              </form>
            </div>
          </section>

          {/* Lista de posts */}
          <section className="space-y-4">
            {posts.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </section>

          <div className="h-6" />
        </div>
      </div>
    </div>
  );
}



function TabChip({ children, active = false }) {
  return (
    <button
      type="button"
      className={`rounded-full px-3 py-1 text-sm transition
        ${
          active
            ? "bg-[#F9A8D4] text-white ring-1 ring-pink-200 shadow-[0_6px_14px_rgba(251,113,133,0.25)]"
            : "bg-white/70 text-rose-900 ring-1 ring-pink-200/60 hover:bg-white"
        }`}
    >
      {children}
    </button>
  );
}

function TagChip({ children }) {
  return (
    <span
      className="
        inline-flex items-center rounded-full
        bg-white/70 text-rose-900 text-xs
        px-2 py-1 ring-1 ring-pink-200/60
      "
    >
      {children}
    </span>
  );
}

function AvatarInitials({ text = "US" }) {
  return (
    <div
      className="
        flex h-10 w-10 items-center justify-center
        rounded-full bg-[#F9A8D4] text-white
        font-semibold ring-1 ring-pink-200
        shadow-[0_6px_14px_rgba(251,113,133,0.25)]
        select-none
      "
      aria-hidden
    >
      {text}
    </div>
  );
}

function PostCard({ post }) {
  const [comment, setComment] = useState("");

  return (
    <article
      className="
        rounded-2xl bg-white/70 ring-1 ring-pink-200/70
        shadow-[0_10px_24px_rgba(251,113,133,0.20)]
        p-4
      "
    >
      {/* Header del post */}
      <div className="flex items-center gap-3">
        <AvatarInitials text={post.author} />
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-[14px] font-semibold text-[#0f172a] truncate">
              {post.name}
            </p>
            <span className="text-[12px] text-[#0f172a]/60">{post.time}</span>
          </div>
          <div className="mt-1 flex flex-wrap gap-2">
            {post.tags.map((t, i) => (
              <TagChip key={i}>#{t}</TagChip>
            ))}
          </div>
        </div>
      </div>

      {/* Contenido */}
      <p className="mt-3 text-[14px] text-[#0f172a]">{post.content}</p>

      {/* Footer: acciones */}
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <ActionStat icon={<HeartIcon className="h-4 w-4" />} value={post.likes} />
          <ActionStat icon={<ChatIcon className="h-4 w-4" />} value={post.comments} />
        </div>

        <button
          type="button"
          className="
            text-sm font-medium text-rose-900/90
            hover:text-rose-900 transition
          "
        >
          Guardar
        </button>
      </div>

      {/* Caja de comentario (UI) */}
      <form
        className="
          mt-3 flex items-center gap-2 rounded-xl bg-white/70
          ring-1 ring-rose-200/70 px-3 py-2
        "
        onSubmit={(e) => {
          e.preventDefault();
          if (!comment.trim()) return;
          // Aquí luego conectarás la funcionalidad real
          setComment("");
        }}
      >
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Escribe un comentario…"
          className="
            flex-1 bg-transparent outline-none
            text-[14px] text-[#0f172a]
            placeholder:text-[#0f172a]/50
          "
          autoComplete="off"
          enterKeyHint="send"
        />
        <button
          type="submit"
          className="
            inline-flex h-8 px-3 items-center justify-center gap-2
            rounded-full bg-[#F9A8D4] text-white text-sm font-semibold
            ring-1 ring-pink-200
            hover:bg-[#F472B6] transition
            disabled:opacity-60
          "
          disabled={!comment.trim()}
        >
          <SendIcon className="h-4 w-4" />
          Enviar
        </button>
      </form>
    </article>
  );
}

function ActionStat({ icon, value }) {
  return (
    <span className="inline-flex items-center gap-1 text-[13px] text-[#0f172a]/80">
      {icon}
      <span>{value}</span>
    </span>
  );
}

function HeartIcon({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 21s-6.716-4.31-9.428-7.022C.857 12.263.5 10.5 1.343 9.071 2.22 7.575 3.91 6.75 5.6 7.07c1.093.206 2.063.862 2.704 1.8.64-.938 1.61-1.594 2.704-1.8 1.69-.32 3.38.506 4.257 2.001.843 1.429.486 3.192-1.229 4.907C18.716 16.69 12 21 12 21z" />
    </svg>
  );
}

function ChatIcon({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20 2H4a2 2 0 00-2 2v14l4-4h14a2 2 0 002-2V4a2 2 0 00-2-2z" />
    </svg>
  );
}

function SendIcon({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
    </svg>
  );
}
