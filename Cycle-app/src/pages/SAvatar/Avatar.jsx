import { useState, useCallback } from "react";
import { sesion } from "../../componentes/funciones/sesion";
import AvatarSticker from "../../componentes/AvatarSticker";


export default function Avatar() {
  sesion();
  const [baseColor, setBaseColor] = useState(PALETTE[0].hex);
  const [selectedSticker, setSelectedSticker] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState({ type: null, text: "" });
  const canSave = !!selectedSticker && !saving;

  const handleBack = useCallback(() => {
    history.back();
  }, []);
  const handleSave = useCallback(async () => {

    if (!selectedSticker) return;

    const usuario =
      JSON.parse(localStorage.getItem("usuarioPHP")) ||
      JSON.parse(localStorage.getItem("usuarioGoogle"));

    setSaving(true);
    setSaveMsg({ type: null, text: "" });

    try {

      const response = await fetch("https://salmon-mosquito-816172.hostingersite.com/modelo/Gavatar.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id_usuario: usuario.id,   // Aqui tambien cambia lo del ID de usuario
          id_avatar: selectedSticker.id

        })
      });

      const data = await response.json();

      console.log(data);

      if (data.status === "ok") {
        setSaveMsg({ type: "ok", text: "¡Avatar guardado!" });
      } else {
        setSaveMsg({ type: "error", text: "No se pudo guardar" });
      }

    } catch (error) {

      setSaveMsg({ type: "error", text: "Error del servidor" });

    }

    setSaving(false);

  }, [selectedSticker]);



  return (
    <div className="fixed inset-0 overflow-auto bg-[#FCE7F3]">
      {/* ===== Fondos estilo app ===== */}
      <div className="pointer-events-none absolute -top-24 left-0 h-[340px] w-full rounded-b-[90px] bg-[#FBCFE8]/90" />
      <div className="pointer-events-none absolute -right-44 top-16 h-[520px] w-[520px] rounded-full bg-[#F9A8D4]/55" />
      <div className="pointer-events-none absolute -bottom-64 -left-56 h-[600px] w-[760px] rounded-full bg-[#FBCFE8]/75" />
      <div className="pointer-events-none absolute bottom-14 right-10 hidden h-[380px] w-[380px] rounded-full border border-white/45 lg:block" />
      <div className="pointer-events-none absolute bottom-5 right-28 hidden h-[260px] w-[260px] rounded-full border border-white/35 lg:block" />

      {/* ===== Contenido ===== */}
      <div
        className="
          relative mx-auto flex min-h-full w-full max-w-md flex-col
          px-4 sm:px-6
          pt-[calc(env(safe-area-inset-top)+16px)]
          pb-[calc(env(safe-area-inset-bottom)+16px)]
        "
      >
        {/* Header */}
        <header className="flex items-center gap-3 py-1">
          <button
            type="button"
            onClick={handleBack}
            aria-label="Volver"
            className="mb-4 text-xl font-bold text-rose-900 hover:scale-110 transition"
          >
            ←
          </button>

          <h1 className="font-extrabold tracking-tight text-rose-900 text-[20px] sm:text-[22px]">
            Crear avatar
          </h1>
        </header>

        {/* Preview del avatar */}
        <section className="mt-4 flex flex-col items-center">
          <div
            className="relative h-[120px] w-[120px] rounded-full ring-2 ring-pink-200 shadow-md flex items-center justify-center overflow-hidden"
            style={{ backgroundColor: baseColor }}
            aria-label="Vista previa del avatar"
          >
            {selectedSticker ? (
              USE_EMOJI_FALLBACK ? (
                <span className="text-[56px]" role="img" aria-label={selectedSticker.label}>
                  {selectedSticker.emoji}
                </span>
              ) : (
                <img
                  src={selectedSticker.src}
                  alt={selectedSticker.label}
                  className="h-[84px] w-[84px] object-contain"
                  draggable={false}
                />
              )
            ) : (
              <AvatarSilhouette className="h-[84px] w-[84px] text-white/85" />
            )}
          </div>

          {/* Paleta de colores */}
          <div className="mt-5 flex items-center gap-4">
            <div className="mt-5 border-t border-rose-200/70" />
          </div>
        </section>

        {/* Separador */}
        <div className="mt-5 border-t border-rose-200/70" />

        {/* Grid de stickers */}
        <section className="mt-4">
          <div className="grid grid-cols-4 gap-3">
            {STICKERS.map((s) => (
              <AvatarSticker
                key={s.id}
                src={s.src}
                alt={s.label}
                selected={selectedSticker?.id === s.id}
                onClick={() => setSelectedSticker(s)}
              />
            ))}

          </div>
        </section>

        {/* Onda decorativa inferior */}
        <div aria-hidden className="mt-6 relative h-[90px]">
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 400 120"
            preserveAspectRatio="none"
          >
          </svg>
        </div>

        {/* Feedback local */}
        {saveMsg.type && (
          <div
            className={`
              mt-1 mb-2 rounded-xl px-3 py-2 text-sm
              ${saveMsg.type === "ok" ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-900"}
            `}
          >
            {saveMsg.text}
          </div>
        )}

        {/* Botón Guardar */}
        <div className="w-full">
          <button
            type="button"
            onClick={handleSave}
            disabled={!canSave}
            className={`
              mx-auto block w-full rounded-2xl bg-[#F9A8D4]
              text-rose-950 font-semibold
              px-5 py-3
              shadow-[0_10px_24px_rgba(251,113,133,0.35)]
              ring-1 ring-pink-200
              transition
              hover:bg-[#F472B6] hover:shadow-[0_14px_30px_rgba(251,113,133,0.45)]
              disabled:opacity-60 disabled:cursor-not-allowed
            `}
          >
            {saving ? "Guardando…" : "Guardar"}
          </button>
        </div>
      </div>
    </div>
  );
}


/** Silueta del avatar */
function AvatarSilhouette({ className = "h-20 w-20", color = "currentColor" }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill={color} aria-hidden="true">
      <circle cx="32" cy="22" r="12" opacity="0.85" />
      <path d="M8 56c0-10.493 9.178-19 20.5-19h7C46.822 37 56 45.507 56 56" opacity="0.6" />
    </svg>
  );
}

// Paleta de colores
const PALETTE = [
  { id: "ice", hex: "#F472B6" },
];
const USE_EMOJI_FALLBACK = false;

const STICKERS = Array.from({ length: 12 }, (_, i) => {
  const id = i + 1;

  return {
    id,
    label: `Avatar ${id}`,
    src: new URL(`/assets/avatars/Designer${id}.png`, import.meta.url).href
  };
});

