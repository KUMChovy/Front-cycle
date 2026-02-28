import { useNavigate } from "react-router-dom";
import calendario from "../assets/calendario.png";
import Imagen from "../componentes/Imagen";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 overflow-hidden bg-[#FCE7F3]">
      {/* ===== Background  ===== */}
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
          {/* Imagen superior */}
          <Imagen src={calendario} alt="Calendario" />

          {/* Título */}
          <h2 className="mb-6 text-center text-balance font-black tracking-tight text-black leading-[0.95] text-[clamp(1.85rem,4.6vw,3.4rem)]">
            Iniciar sesión
          </h2>

          {/* ===== Formulario ===== */}
          <form className="space-y-4">
            {/* Email */}
            <input
              type="email"
              placeholder="E-mail"
              className="
                w-full rounded-full bg-white/90 px-5 py-4 text-sm
                shadow-[0_6px_20px_rgba(0,0,0,0.06)]
                focus:outline-none focus:ring-4 focus:ring-pink-200
              "
            />

            {/* Password */}
            <input
              type="password"
              placeholder="Password"
              className="
                w-full rounded-full bg-white/90 px-5 py-4 text-sm
                shadow-[0_6px_20px_rgba(0,0,0,0.06)]
                focus:outline-none focus:ring-4 focus:ring-pink-200
              "
            />

            {/* Botón iniciar sesión */}
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
              Iniciar sesión
            </button>
          </form>

          {/* ===== Links inferiores ===== */}
          <div className="mt-6 flex flex-col items-center gap-2 text-xs sm:text-sm text-black/70">
            <button
              onClick={() => navigate("/register")}
              className="font-semibold hover:underline"
            >
              Regístrate
            </button>

            <button className="hover:underline"
            onClick={() => navigate("/recuperacion")}>
              Olvidé mi contraseña
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}