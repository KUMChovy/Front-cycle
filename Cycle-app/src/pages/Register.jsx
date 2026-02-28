import { useNavigate } from "react-router-dom";
import calendario from "../assets/calendario.png";
import Imagen from "../componentes/Imagen";

export default function Register() {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 overflow-hidden bg-[#FCE7F3]">
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
          <Imagen
            src={calendario}
            alt="Calendario"
          />
          <h2 className="mb-4 text-center text-balance font-black tracking-tight text-black leading-[0.95] text-[clamp(1.85rem,4.6vw,3.4rem)]">
            Registro
          </h2>

          {/* ===== Botones sociales ===== */}
          <div className="mb-6 flex items-center justify-center gap-4">
            {/* Facebook */}
            <button

              className="
    flex h-20 w-20 items-center justify-center
    rounded-full bg-white/90
    shadow-[0_6px_20px_rgba(0,0,0,0.08)]
    backdrop-blur
    transition-all duration-300
    hover:bg-pink-300
    hover:shadow-[0_12px_32px_rgba(251,113,133,0.45)]
    hover:-translate-y-[1px]
    active:scale-[0.95]
    focus:outline-none focus:ring-4 focus:ring-pink-200
  "

              aria-label="Registrarse con Facebook"
            >
              <span className="flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="h-5 w-5 fill-[#1877F2]"
                >
                  <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.326v21.348C0 23.403.597 24 1.326 24H12.82v-9.294H9.692V11.01h3.128V8.309c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.313h3.587l-.467 3.696h-3.12V24h6.116C23.403 24 24 23.403 24 22.674V1.326C24 .597 23.403 0 22.675 0z" />
                </svg>
              </span>
            </button>

            {/* Google */}
            <button

              className="
    flex h-20 w-20 items-center justify-center
    rounded-full bg-white/90
    shadow-[0_6px_20px_rgba(0,0,0,0.08)]
    backdrop-blur
    transition-all duration-300
    hover:bg-pink-300
    hover:shadow-[0_12px_32px_rgba(251,113,133,0.45)]
    hover:-translate-y-[1px]
    active:scale-[0.95]
    focus:outline-none focus:ring-4 focus:ring-pink-200
  "

              aria-label="Registrarse con Google"
            >
              <span className="flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  className="h-5 w-5"
                >
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.01 1.53 7.39 2.81l5.48-5.48C33.17 3.52 28.9 1.5 24 1.5 14.98 1.5 7.39 6.98 4.68 14.81l6.38 4.95C12.59 13.53 17.82 9.5 24 9.5z" />
                  <path fill="#4285F4" d="M46.5 24.5c0-1.63-.15-3.2-.43-4.73H24v9.02h12.7c-.55 2.97-2.2 5.49-4.7 7.18l7.18 5.59c4.2-3.88 6.32-9.59 6.32-17.06z" />
                  <path fill="#FBBC05" d="M10.06 28.76c-.48-1.45-.76-2.99-.76-4.58s.28-3.13.76-4.58l-6.38-4.95C2.01 18.09 1.5 21 1.5 24s.51 5.91 2.18 9.35l6.38-4.59z" />
                  <path fill="#34A853" d="M24 46.5c6.48 0 11.92-2.14 15.89-5.82l-7.18-5.59c-1.99 1.34-4.53 2.13-8.71 2.13-6.18 0-11.41-4.03-12.94-9.46l-6.38 4.59C7.39 41.02 14.98 46.5 24 46.5z" />
                </svg>
              </span>            </button>
          </div>

          {/* ===== Formulario ===== */}
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Nombre"
              className="
                w-full rounded-full bg-white/90 px-5 py-3 text-sm
                shadow-[0_6px_20px_rgba(0,0,0,0.06)]
                focus:outline-none focus:ring-4 focus:ring-pink-200
              "
            />

            <input
              type="email"
              placeholder="Email"
              className="
                w-full rounded-full bg-white/90 px-5 py-3 text-sm
                shadow-[0_6px_20px_rgba(0,0,0,0.06)]
                focus:outline-none focus:ring-4 focus:ring-pink-200
              "
            />

            <input
              type="password"
              placeholder="Contraseña"
              className="
                w-full rounded-full bg-white/90 px-5 py-3 text-sm
                shadow-[0_6px_20px_rgba(0,0,0,0.06)]
                focus:outline-none focus:ring-4 focus:ring-pink-200
              "
            />

            {/* Botón crear cuenta */}
            <button
              type="submit"
              className="
    mt-6 w-full rounded-full bg-white/90 px-6 py-4
    font-semibold text-black
    shadow-[0_10px_30px_rgba(0,0,0,0.08)]
    backdrop-blur
    transition-all duration-300
    hover:bg-pink-400 hover:text-white
    hover:shadow-[0_14px_40px_rgba(251,113,133,0.45)]
    active:scale-[0.98]
    focus:outline-none focus:ring-4 focus:ring-pink-200
  "
            >
              Crear cuenta
            </button>
          </form>

          {/* Links */}
          <div className="mt-4 flex items-center justify-center gap-3 text-xs sm:text-sm text-black/60">
            <button
              onClick={() => navigate("/login")}
              className="underline decoration-pink-400/60 underline-offset-4 hover:text-black"
            >
              Iniciar sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}