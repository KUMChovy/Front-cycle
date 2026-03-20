import { sesion } from "../../componentes/funciones/sesion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const handleCheckout = async (plan) => {
  try {
    console.log("Enviando plan:", plan);
    const res = await fetch("http://localhost/cycle_back/control/create_preference.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan }),
    });

    const textResponse = await res.text();
    let data;
    try {
      data = JSON.parse(textResponse);
    } catch (e) {
      console.error("Error parseando JSON:", e);
      alert("Error: La respuesta no es JSON válido. Ver consola.");
      return;
    }

    if (data.redirect) { window.location.href = data.redirect; return; }
    if (data.error) { alert("Error: " + data.error); return; }
    if (data.init_point) { window.location.href = data.init_point; }
    else { alert("Error: No se pudo crear la preferencia de pago."); }
  } catch (error) {
    alert("Error de conexión: " + error.message);
  }
};

export default function Plan() {
  sesion();
  const navigate = useNavigate();
  const [esPremium, setEsPremium] = useState(false);

  useEffect(() => {
    const usuarioPHP = JSON.parse(localStorage.getItem("usuarioPHP"));
    const usuarioGoogle = JSON.parse(localStorage.getItem("usuarioGoogle"));
    const usuario = usuarioPHP || usuarioGoogle;
    setEsPremium(usuario?.tipo === "premium");
  }, []);

  const cards = [
    {
      title: "Plan Básico",
      plan: "basico",
      h2: "MXN 0 al mes",
      text: ["Seguimiento del Ciclo", "Registro de Síntomas", "Historial de Ciclos"],
    },
    {
      title: "Plan Premium",
      plan: "premium",
      h2: "MXN 35 al mes",
      text: ["Mensajes Bot/Usuaria", "Clínicas cercanas", "Foro", "Biblioteca de información", "Listado, categorías y búsquedas"],
    },
  ];

  return (

    <div className="relative min-h-screen overflow-x-hidden">
      {/* ===== Background ===== */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#FCE7F3]">
        <div className="absolute -top-24 left-0 h-[340px] w-full rounded-b-[90px] bg-[#FBCFE8]/90" />
        <div className="absolute -right-44 top-16 h-[520px] w-[520px] rounded-full bg-[#F9A8D4]/55" />
        <div className="absolute -bottom-64 -left-56 h-[600px] w-[760px] rounded-full bg-[#FBCFE8]/75" />
        <div className="absolute bottom-14 right-10 hidden h-[380px] w-[380px] rounded-full border border-white/45 lg:block" />
        <div className="absolute bottom-5 right-28 hidden h-[260px] w-[260px] rounded-full border border-white/35 lg:block" />
      </div>

      {/* ===== Content ===== */}
      <div className="
        relative z-10 mx-auto w-full max-w-5xl
        px-6 sm:px-10
        pt-[calc(env(safe-area-inset-top)+16px)]
        pb-[calc(env(safe-area-inset-bottom)+16px)]
      ">

        <button
          onClick={() => navigate("/perfil")}
          className="mb-4 text-xl font-bold text-rose-900 hover:scale-110 transition"
        >←</button>

        <h1 className="mb-8 text-center font-extrabold tracking-tight text-rose-900 text-[28px] sm:text-[36px] leading-tight">
          Elige tu plan
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card, index) => {
            const esActual = (card.plan === "premium" && esPremium) || (card.plan === "basico" && !esPremium);

            return (
              <div key={index}
                className={`rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(244,114,182,0.20)] transition-transform hover:scale-[1.02]
                  ${esActual ? "ring-2 ring-pink-400" : ""}
                `}
              >
                {/* Header tarjeta */}
                <div className="bg-gradient-to-r from-[#ff84ab] to-[#ffc1d6] p-6 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">{card.title}</h2>
                  {esActual && (
                    <span className="rounded-full bg-white/30 px-3 py-1 text-xs font-semibold text-white">
                      Plan actual ✓
                    </span>
                  )}
                </div>

                {/* Body tarjeta */}
                <div className="bg-white/80 backdrop-blur p-6">
                  <p className="text-2xl font-bold text-[#0f172a] mb-4">{card.h2}</p>
                  <ul className="space-y-2 mb-6">
                    {card.text.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="text-pink-400">✓</span> {item}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleCheckout(card.title)}
                    disabled={esActual}
                    className={`w-full rounded-full px-6 py-3 font-semibold transition-all duration-300
                      ${esActual
                        ? "bg-pink-100 text-pink-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-[#ff84ab] to-[#ffc1d6] text-white shadow-[0_8px_20px_rgba(244,114,182,0.35)] hover:shadow-[0_12px_28px_rgba(244,114,182,0.5)] hover:-translate-y-[1px]"
                      }`}
                  >
                    {esActual ? "Plan activo" : "Suscribirse"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}