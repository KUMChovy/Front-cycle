import { useNavigate } from "react-router-dom";

import LogoAvatar from "../componentes/LogoAvatar";
import logo from "../assets/logo.png"
import Imagen from "../componentes/Imagen";
import { sesion } from "../componentes/funciones/sesion";


export default function HomeAut() {
  sesion();
  const navigate = useNavigate();

  const usuario =
      JSON.parse(localStorage.getItem("usuarioPHP")) ||
      JSON.parse(localStorage.getItem("usuarioGoogle"));

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
          relative flex h-full w-full items-center justify-center
          px-6 sm:px-10
          pt-[calc(env(safe-area-inset-top)+16px)]
          pb-[calc(env(safe-area-inset-bottom)+16px)]
        "
      >
        <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl">
          {/* Header */}
          <header className="mb-6 sm:mb-8 flex items-center gap-3">
            <LogoAvatar
              src={logo}
              alt="Logo Cycle"
              fallback="C"
            />
            <div className="leading-tight">
              <h1 className="text-base sm:text-lg font-semibold text-black">
                Cycle
              </h1>
            </div>
          </header>

          <h2 className="text-balance font-black tracking-tight text-black leading-[0.95] text-[clamp(1.85rem,4.6vw,3.4rem)]">
            Bienvenida {usuario.nombre}
          </h2>


          <p className="mt-3 sm:mt-4 max-w-md text-pretty text-sm sm:text-lg text-black/60">
            Gracias por estar aquí. Tu bienestar comienza contigo.
          </p>

          <button
            onClick={() => navigate("/test")}
            className="
              mt-6 sm:mt-8 w-full rounded-full bg-white/90 px-6 py-4
              flex items-center justify-between
              shadow-[0_10px_30px_rgba(0,0,0,0.08)] backdrop-blur transition
              hover:shadow-[0_14px_40px_rgba(0,0,0,0.12)] active:scale-[0.99]
              focus:outline-none focus:ring-4 focus:ring-pink-200
            "
          >
            <span className="text-base sm:text-xl font-semibold text-black">
              Continuar
            </span>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-100 text-xl text-black">
              →
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}