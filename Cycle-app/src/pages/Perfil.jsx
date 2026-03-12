import { useNavigate } from "react-router-dom";

export default function Perfil() {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 overflow-hidden bg-[#FCE7F3]">
      {/* ===== Background ===== */}
      <div className="pointer-events-none absolute -top-24 left-0 h-[340px] w-full rounded-b-[90px] bg-[#FBCFE8]/90" />
      <div className="pointer-events-none absolute -right-44 top-16 h-[520px] w-[520px] rounded-full bg-[#F9A8D4]/55" />
      <div className="pointer-events-none absolute -bottom-64 -left-56 h-[600px] w-[760px] rounded-full bg-[#FBCFE8]/75" />

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

          {/* Botón volver */}
          <button 
            onClick={() => navigate("/Home")}
            className="mb-4 text-xl"
            >
            ←
          </button>

          {/* ===== Tarjeta usuario ===== */}
          <div className="mb-6 flex items-center gap-4 rounded-3xl bg-black/30 px-6 py-4 backdrop-blur">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/20">
              👤
            </div>

            <div>
              <p className="text-lg font-semibold text-black">Usuario</p>
              <p className="text-sm text-black/60">correo</p>
            </div>
          </div>

          {/* ===== Objetivo ===== */}
          <h3 className="mb-3 text-lg font-bold text-black">Mi objetivo:</h3>

          <div className="mb-6 flex flex-wrap gap-2">
            <span className="rounded-full bg-pink-200 px-4 py-1 text-sm">
              Seguir mi ciclo
            </span>

            <span className="rounded-full bg-pink-200 px-4 py-1 text-sm">
              Quedarme embarazada
            </span>
          </div>

          {/* ===== Lista de opciones ===== */}
        <div className="space-y-3">

        {[
            { texto: "Ajustes de Aplicación", icono: "⚙️" },
            { texto: "Ocultar contenido", icono: "🙈" },
            { texto: "Acceso Seguro", icono: "🔒" },
            { texto: "Recordatorios", icono: "⏰" },
            { texto: "Ajustes de privacidad", icono: "🛡️" },
            { texto: "Suscripción Premium", icono: "👑" },
            { texto: "Cerrar sesión", icono: "🚪" },
        ].map((item, index) => (
            <div
            key={index}
            className="
            flex items-center justify-between
            rounded-xl bg-white/80 px-4 py-3
            shadow-sm backdrop-blur
            "
            >
            <div className="flex items-center gap-3">

                <span className="text-lg">
                {item.icono}
                </span>

                <span className="text-sm font-medium text-black">
                {item.texto}
                </span>

            </div>

            <span className="text-black/40">›</span>
            </div>
        ))}

        </div>


        </div>
      </div>
    </div>
  );
}