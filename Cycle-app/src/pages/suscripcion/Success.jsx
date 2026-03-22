import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Success() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading"); // "loading" | "ok" | "error"

  useEffect(() => {
    async function actualizarPremium() {
      try {
        const params = new URLSearchParams(window.location.search);
        const email  = params.get("external_reference");

        if (email) {
          const res  = await fetch(
            `https://salmon-mosquito-816172.hostingersite.com/modelo/success.php?external_reference=${encodeURIComponent(email)}`
          );
          const data = await res.json();

          if (data.status === "ok") {
            // ✅ Actualiza localStorage
            const usuarioPHP    = JSON.parse(localStorage.getItem("usuarioPHP"));
            const usuarioGoogle = JSON.parse(localStorage.getItem("usuarioGoogle"));

            if (usuarioPHP) {
              localStorage.setItem("usuarioPHP", JSON.stringify({ ...usuarioPHP, tipo: "premium" }));
            } else if (usuarioGoogle) {
              localStorage.setItem("usuarioGoogle", JSON.stringify({ ...usuarioGoogle, tipo: "premium" }));
            }

            setStatus("ok"); // ✅ Muestra modal de éxito
          } else {
            setStatus("error"); // ✅ Muestra modal de error
          }
        } else {
          setStatus("error");
        }
      } catch (err) {
        console.error(err);
        setStatus("error");
      }
    }

    actualizarPremium();
  }, []);

  // ✅ Cierra sesión y redirige al login
  const cerrarSesionYredirigir = () => {
    localStorage.removeItem("usuarioPHP");
    localStorage.removeItem("usuarioGoogle");
    navigate("/login");
  };

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

      {/* ===== Loading ===== */}
      {status === "loading" && (
        <div className="relative z-10 flex min-h-screen items-center justify-center">
          <p className="text-[15px] text-[#0f172a]/60 animate-pulse">Verificando pago...</p>
        </div>
      )}

      {/* ===== Modal éxito ===== */}
      {status === "ok" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
          <div className="w-full max-w-sm rounded-3xl bg-white/90 backdrop-blur shadow-[0_20px_60px_rgba(244,114,182,0.30)] p-8 text-center">
            <span className="text-6xl block mb-4">🎉</span>
            <h2 className="text-[22px] font-extrabold text-rose-900 mb-2">¡Pago exitoso!</h2>
            <p className="text-[14px] text-[#0f172a]/70 mb-2">Ya eres usuaria <strong>Premium ✨</strong></p>

            {/* ✅ Advertencia de reinicio de sesión */}
            <div className="mt-4 rounded-2xl bg-pink-50 border border-pink-200 px-4 py-3 mb-6">
              <p className="text-[13px] text-rose-700 font-medium">⚠️ Para activar tu plan</p>
              <p className="text-[12px] text-rose-600 mt-1">
                Debes volver a iniciar sesión para que los cambios surtan efecto.
              </p>
            </div>

            <button
              onClick={cerrarSesionYredirigir}
              className="w-full rounded-full bg-gradient-to-r from-[#ff84ab] to-[#ffc1d6] px-6 py-3 font-semibold text-white shadow-[0_8px_20px_rgba(244,114,182,0.35)] hover:shadow-[0_12px_28px_rgba(244,114,182,0.5)] transition-all duration-300"
            >
              Iniciar sesión ahora
            </button>
          </div>
        </div>
      )}

      {/* ===== Modal error ===== */}
      {status === "error" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
          <div className="w-full max-w-sm rounded-3xl bg-white/90 backdrop-blur shadow-[0_20px_60px_rgba(244,114,182,0.30)] p-8 text-center">
            <span className="text-6xl block mb-4">❌</span>
            <h2 className="text-[22px] font-extrabold text-rose-900 mb-2">Algo salió mal</h2>
            <p className="text-[14px] text-[#0f172a]/70 mb-2">
              No pudimos confirmar tu pago. Si realizaste el pago, contacta a soporte.
            </p>

            {/* ✅ Advertencia */}
            <div className="mt-4 rounded-2xl bg-pink-50 border border-pink-200 px-4 py-3 mb-6">
              <p className="text-[13px] text-rose-700 font-medium">⚠️ ¿Ya realizaste el pago?</p>
              <p className="text-[12px] text-rose-600 mt-1">
                Intenta iniciar sesión de nuevo. Si el problema persiste, contáctanos.
              </p>
            </div>

            <button
              onClick={() => navigate("/plan")}
              className="w-full rounded-full bg-gradient-to-r from-[#ff84ab] to-[#ffc1d6] px-6 py-3 font-semibold text-white shadow-[0_8px_20px_rgba(244,114,182,0.35)] hover:shadow-[0_12px_28px_rgba(244,114,182,0.5)] transition-all duration-300 mb-3"
            >
              Volver a intentar
            </button>
            <button
              onClick={cerrarSesionYredirigir}
              className="w-full rounded-full bg-white px-6 py-3 font-semibold text-rose-900 ring-1 ring-pink-300 hover:bg-pink-50 transition-all duration-300"
            >
              Iniciar sesión
            </button>
          </div>
        </div>
      )}
    </div>
  );
}