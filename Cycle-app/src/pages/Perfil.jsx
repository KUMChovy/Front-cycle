import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../componentes/funciones/logout";
import { sesion } from "../componentes/funciones/sesion";
import UserAvatar from "../componentes/UserAvatar";

export default function Perfil() {
  sesion();
  const navigate = useNavigate();

  const usuario =
    JSON.parse(localStorage.getItem("usuarioPHP")) ||
    JSON.parse(localStorage.getItem("usuarioGoogle"));

  const [objetivo, setObjetivo] = useState("");
  const [usoAppEsperado, setUsoAppEsperado] = useState("");

    useEffect(() => {
    if (!usuario?.id) return;

    fetch("https://salmon-mosquito-816172.hostingersite.com/modelo/objetivo.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id_usuario: usuario.id
      })
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.status === "ok") {
          setObjetivo(data.objetivo || "");
          setUsoAppEsperado(data.uso_app_esperado || "");
        }
      })
      .catch((error) => {
        console.error("Error al obtener objetivos:", error);
      });
  }, []);


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
        {/* Botón volver */}
        <button
          onClick={() => navigate("/ciclo")}
          className="mb-4 text-xl font-bold text-rose-900 hover:scale-110 transition"
        >←</button>

        {/* ===== Tarjeta usuario ===== */}
        <div
          onClick={() => navigate("/avatar")}
          className="mb-6 flex items-center gap-4 rounded-3xl bg-black/30 px-6 py-4 backdrop-blur cursor-pointer"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/20">
            <UserAvatar />
          </div>
          <div>
            <p className="text-lg font-semibold text-black">{usuario.nombre}</p>
            <p className="text-sm text-black/60">{usuario.email}</p>
          </div>
        </div>

        {/* ===== Objetivo ===== */}
        <h3 className="mb-3 text-lg font-bold text-black">Mi objetivo:</h3>
        <div className="mb-6 flex flex-wrap gap-2">
          {objetivo && (
            <span className="rounded-full bg-pink-200 px-4 py-1 text-sm">
              {objetivo}
            </span>
          )}

          {usoAppEsperado && (
            <span className="rounded-full bg-pink-200 px-4 py-1 text-sm">
              {usoAppEsperado}
            </span>
          )}
        </div>

        {/* ===== Lista de opciones ===== */}
        <div className="space-y-3">
          {[
            { texto: "Ajustes de Aplicación", icono: "⚙️", accion: () => {} },
            { texto: "Foro",                  icono: "🗫",  accion: () => navigate("/foro") },
            { texto: "Chatbot",               icono: "🤖",  accion: () => navigate("/chatcycle") },
            { texto: "Recordatorios",         icono: "⏰",  accion: () => {} },
            { texto: "Ajustes de privacidad", icono: "🛡️",  accion: () => {} },
            { texto: "Suscripción Premium",   icono: "👑",  accion: () => navigate("/plan") },
            { texto: "Cerrar sesión",         icono: "🚪",  accion: () => logout() },
          ].map((item, index) => (
            <button
              key={index}
              onClick={item.accion}
              className="w-full flex items-center justify-between rounded-xl bg-white/80 px-4 py-3 shadow-sm backdrop-blur text-left"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{item.icono}</span>
                <span className="text-sm font-medium text-black">{item.texto}</span>
              </div>
              <span className="text-black/40">›</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}