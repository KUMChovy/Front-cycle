import { useCallback, useState, useEffect } from "react";
import { validarPremium } from "../../componentes/funciones/premium";
import LogoAvatar from "../../componentes/LogoAvatar";
import logo from "../../assets/logo.png";
import calendario from "../../assets/calendario.webp";
import Imagen from "../../componentes/Imagen";

import Designer16 from "../../assets/chaticon/Designer16.png";
import Designer17 from "../../assets/chaticon/Designer17.png";
import Designer18 from "../../assets/chaticon/Designer18.png";
import Designer19 from "../../assets/chaticon/Designer19.png";

export default function ChatCycleView() {
  const [message, setMessage] = useState("");
  const [usuario, setUsuario] = useState(null);
  const [esPremium, setEsPremium] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleBack = useCallback(() => {
    if (typeof history !== "undefined" && history.length > 1) {
      history.back();
    }
  }, []);

  // ✅ useEffect limpio y completo
  useEffect(() => {
    async function init() {
      try {
        const usuarioPHP = JSON.parse(localStorage.getItem("usuarioPHP"));
        const usuarioGoogle = JSON.parse(localStorage.getItem("usuarioGoogle"));
        const usuarioActual = usuarioPHP || usuarioGoogle;

        if (usuarioActual) {
          setUsuario(usuarioActual);
          const premium = await validarPremium();
          setEsPremium(!!premium);
        }
      } catch (err) {
        console.error("Error al inicializar sesión:", err);
      } finally {
        setLoading(false);
      }
    }
    init();
  }, []);

  if (loading) return <div>Cargando sesión...</div>;

  return (
    <div className="fixed inset-0 overflow-hidden bg-[#FCE7F3]">
      <div className="pointer-events-none absolute -top-24 left-0 h-[340px] w-full rounded-b-[90px] bg-[#FBCFE8]/90" />
      <div className="pointer-events-none absolute -right-44 top-16 h-[520px] w-[520px] rounded-full bg-[#F9A8D4]/55" />
      <div className="pointer-events-none absolute -bottom-64 -left-56 h-[600px] w-[760px] rounded-full bg-[#FBCFE8]/75" />
      <div className="pointer-events-none absolute bottom-14 right-10 hidden h-[380px] w-[380px] rounded-full border border-white/45 lg:block" />
      <div className="pointer-events-none absolute bottom-5 right-28 hidden h-[260px] w-[260px] rounded-full border border-white/35 lg:block" />

      <div className="relative flex h-full w-full items-center justify-center px-6 sm:px-10 pt-[calc(env(safe-area-inset-top)+16px)] pb-[calc(env(safe-area-inset-bottom)+16px)]">
        <div className="w-full max-w-[360px] sm:max-w-md">
          <header className="mb-6 sm:mb-8 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <LogoAvatar src={logo} alt="Logo Cycle" fallback="C" />
              <span className="text-[18px] font-medium tracking-tight text-[#0f172a]">Cycle</span>
            </div>
            <button type="button" onClick={handleBack} aria-label="Volver"
              className="mb-4 text-xl font-bold text-rose-900 hover:scale-110 transition">←</button>
          </header>

          <section>
            <div className="flex items-start justify-between">
              <h1 className="text-[30px] leading-[1.05] font-extrabold text-[#0A1128] -tracking-[0.5px]">
                <span className="block">Bienvenida</span>
                <span className="block">soy Cycle</span>
              </h1>
              <div className="ml-3 mt-1 inline-flex h-[100px] w-[100px] items-center justify-center rounded-xl shrink-0 pointer-events-none select-none">
                <Imagen src={calendario} alt="Calendario" />
              </div>
            </div>
            <p className="mt-3 text-[13px] text-[#0f172a]/70">
              {usuario
                ? `Hola ${usuario.nombre}${esPremium ? " ✨ Premium" : ""}`
                : "¿Cómo te sientes hoy?"}
            </p>
          </section>

          <section className="mt-6 grid grid-cols-2 gap-4">
            <QuickActionCard iconSrc={Designer17} labelLines={["Recomendaciones"]} blocked={!esPremium} />
            <QuickActionCard iconSrc={Designer16} labelLines={["Ejercicios", "recomendados"]} blocked={!esPremium} />
            <QuickActionCard iconSrc={Designer18} labelLines={["Alimentación", "sugerida"]} blocked={!esPremium} />
            <QuickActionCard iconSrc={Designer19} labelLines={["Autocuidado"]} blocked={!esPremium} />
          </section>

          <section className="mt-6 pb-2">
            <form
              className="flex items-center gap-3 w-full rounded-2xl bg-white/70 ring-1 ring-[#f9a8d4] shadow-[0_8px_20px_rgba(244,114,182,0.18)] px-4 py-3"
              onSubmit={(e) => { e.preventDefault(); setMessage(""); }}
            >
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Me siento..."
                className="flex-1 bg-transparent outline-none text-[14px] text-[#0f172a] placeholder:text-[#0f172a]/50"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    e.currentTarget.form?.requestSubmit?.();
                  }
                }}
              />
              <button type="submit" aria-label="Enviar"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#F9A8D4] text-white shadow-[0_8px_16px_rgba(251,113,133,0.35)] ring-1 ring-pink-200 hover:bg-[#F472B6] transition shrink-0"
                disabled={!message.trim()}>
                <span className="text-[14px] leading-none">↑</span>
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}

function QuickActionCard({ iconSrc = "", labelLines = [], blocked = false }) {
  return (
    <button type="button" disabled={blocked}
      className={`group relative flex h-[128px] flex-col items-center justify-center gap-2 rounded-2xl transition
        ${blocked
          ? "opacity-40 cursor-not-allowed bg-white/40"
          : "bg-[radial-gradient(120%_120%_at_20%_20%,rgba(249,168,212,0.55),rgba(252,231,243,0.75)_60%,rgba(255,255,255,0.85))] hover:shadow-[0_14px_34px_rgba(244,114,182,0.28)]"
        }
        ring-1 ring-[#f9a8d4]/60 shadow-[0_10px_26px_rgba(244,114,182,0.20)]`}
      aria-label={labelLines.join(" ")}
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/50" />
      {blocked && <span className="absolute top-2 right-2 text-[16px] opacity-60" aria-hidden>🔒</span>}
      <div className="flex h-[54px] w-[54px] items-center justify-center rounded-xl">
        {iconSrc
          ? <img src={iconSrc} alt="" className="h-[44px] w-[44px] object-contain" draggable={false} />
          : <div className="h-[44px] w-[44px] rounded-lg bg-white/70 ring-1 ring-pink-200/70" aria-hidden />
        }
      </div>
      <div className="px-2 text-center text-[13px] leading-[1.05] font-medium text-[#0f172a]">
        {labelLines.map((line, idx) => <span key={idx} className="block">{line}</span>)}
      </div>
    </button>
  );
}