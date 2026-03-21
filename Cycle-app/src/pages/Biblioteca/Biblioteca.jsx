import { useNavigate } from "react-router-dom";
import gatito_lector from "../../assets/gatito_lector.webp";
import Imagen from "../../componentes/Imagen";
import { sesion } from "../../componentes/funciones/sesion";

const recursos = [
  {
    emoji: "🌸",
    titulo: "Hormonas explicadas Fácil",
    descripcion: "Entiende tu ciclo menstrual de forma clara y sencilla",
    href: "https://www.tuasaude.com/es/ciclo-menstrual/",
    color: "from-rose-100 to-pink-50",
    accent: "#F43F5E",
  },
  {
    emoji: "📖",
    titulo: "Educación para primer ciclo",
    descripcion: "Manual de UNICEF para facilitadoras y facilitadores",
    href: "https://www.unicef.org/mexico/media/7206/file/Manual%20para%20facilitadoras%20y%20facilitadores.pdf",
    color: "from-pink-100 to-fuchsia-50",
    accent: "#D946EF",
  },
  {
    emoji: "💡",
    titulo: "Mitos y Realidades",
    descripcion: "Desmitifica creencias sobre la menstruación",
    href: "https://www.cumlaudelab.com/mx/salud-intima/mitos-y-realidades-sobre-la-regla/",
    color: "from-fuchsia-100 to-rose-50",
    accent: "#EC4899",
  },
];

export default function Biblioteca() {
  sesion();
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-x-hidden font-[Georgia,serif]">

      {/* ===== Background ===== */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#FFF0F6]">
        <div className="absolute -top-20 left-0 h-[320px] w-full rounded-b-[80px] bg-[#FBCFE8]/80" />
        <div className="absolute -right-48 top-10 h-[500px] w-[500px] rounded-full bg-[#F9A8D4]/40 blur-sm" />
        <div className="absolute -bottom-56 -left-52 h-[580px] w-[740px] rounded-full bg-[#FBCFE8]/60" />
        {/* Decorative dots grid */}
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="#BE185D" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
        <div className="absolute bottom-14 right-10 hidden h-[360px] w-[360px] rounded-full border border-rose-200/60 lg:block" />
        <div className="absolute bottom-5 right-28 hidden h-[240px] w-[240px] rounded-full border border-pink-200/50 lg:block" />
      </div>

      {/* ===== Content ===== */}
      <div className="relative z-10 mx-auto w-full max-w-2xl px-6 sm:px-10 pt-10 pb-16">

        {/* Header */}
        <header className="mb-8 text-center">
          <span className="mb-3 inline-block rounded-full bg-rose-100 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-rose-600 shadow-sm">
            Recursos de lectura
          </span>
          <h1
            className="font-extrabold tracking-tight text-rose-900 leading-tight"
            style={{
              fontSize: "clamp(2rem, 7vw, 3rem)",
              textShadow: "0 2px 18px rgba(244,63,94,0.10)",
            }}
          >
            📚 Biblioteca
          </h1>
          <p className="mt-2 text-rose-400/80 text-sm sm:text-base font-normal italic">
            Aprende, explora y despeja dudas
          </p>
          {/* Decorative divider */}
          <div className="mx-auto mt-4 flex items-center gap-3 justify-center">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-rose-300" />
            <span className="text-rose-300 text-lg">✦</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-rose-300" />
          </div>
        </header>

        {/* Resource Cards */}
        <div className="flex flex-col gap-4">
          {recursos.map(({ emoji, titulo, descripcion, href, color, accent }, i) => (
            <a
              key={i}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative flex items-center gap-5 rounded-2xl bg-gradient-to-br ${color} px-6 py-5 shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-[0.99] overflow-hidden`}
              style={{ borderLeft: `4px solid ${accent}` }}
            >
              {/* Shine effect on hover */}
              <div className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-white/30 transition-transform duration-700 group-hover:translate-x-full" />

              {/* Emoji badge */}
              <div
                className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-xl text-2xl shadow-sm"
                style={{ background: `${accent}18` }}
              >
                {emoji}
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <p className="font-bold text-rose-900 text-base leading-snug truncate">
                  {titulo}
                </p>
                <p className="mt-0.5 text-rose-500/80 text-sm line-clamp-1">
                  {descripcion}
                </p>
              </div>

              {/* Arrow */}
              <div
                className="flex-shrink-0 ml-2 flex h-8 w-8 items-center justify-center rounded-full text-white shadow-sm transition-transform duration-300 group-hover:translate-x-1"
                style={{ background: accent }}
              >
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </a>
          ))}
        </div>

        {/* Gato lector centrado y con estilo */}
        <div className="mt-10 flex flex-col items-center">
          <div className="relative inline-block">
            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-pink-200/60 to-rose-100/40 blur-md" />
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-pink-200/60 bg-white/60 backdrop-blur-sm p-2">
              <Imagen
                src={gatito_lector}
                alt="gatito leyendo en la biblioteca"
                className="w-44 sm:w-56 object-contain"
              />
            </div>
          </div>
          <p className="mt-4 text-rose-400 text-xs italic text-center">
            ¡El conocimiento es poder! 🌸
          </p>
        </div>

      </div>
    </div>
  );
}