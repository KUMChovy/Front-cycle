import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { sesion } from "../componentes/funciones/sesion"; 

import calendario from "../assets/calendario.png";
import Imagen from "../componentes/Imagen";

export default function Login() {
  sesion();
  const navigate = useNavigate();

  // 🔹 Estados
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 🔹 Login normal (PHP)
  const handleLogin = (e) => {
    e.preventDefault();

    fetch("http://localhost/cycle_back/modelo/login_api.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          //persistencia de datos de sesión en localStorage
          localStorage.setItem("usuarioPHP",JSON.stringify({
            id: data.usuario.id_usuario,
            nombre: data.usuario.nombre,
            email:data.usuario.email,
            provider:"php" 
        }));
          navigate("/Home");
        } else {
          alert(data.mensaje);
        }
      })
      .catch(() => {
        alert("Error conectando con el servidor");
      });
  };

  //Login con Google
  const loginGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfo = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        ).then((res) => res.json());

        const response = await fetch(
          "http://localhost/cycle_back/modelo/login_api.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: userInfo.email,
              auth: "google"
            }),
          }
        );

        const data = await response.json();

        if (data.status === "ok") {

          localStorage.setItem(
            "usuarioGoogle",
            JSON.stringify({
              id: data.usuario.id,
              nombre: data.usuario.nombre,
              email: data.usuario.email,
              provider: "google",
            })
          );

          navigate("/Home");

        } else {

          alert("Este correo no está registrado. Regístrate primero.");

        }
      } catch{
        alert("Error obteniendo datos de Google");
      }
    },
    onError: () => {
      alert("Error al iniciar sesión con Google");
    },
  });

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
          <Imagen src={calendario} alt="Calendario" />

          <h2 className="mb-6 text-center text-balance font-black tracking-tight text-black leading-[0.95] text-[clamp(1.85rem,4.6vw,3.4rem)]">
            Iniciar sesión
          </h2>

          {/* ===== Botón Google ===== */}
          <div className="mb-6 flex items-center justify-center gap-4">
            <button
              onClick={() => loginGoogle()}  
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
              </span>
            </button>
          </div>

          {/* ===== Formulario normal ===== */}
          <form className="space-y-4" onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="
                w-full rounded-full bg-white/90 px-5 py-4 text-sm
                shadow-[0_6px_20px_rgba(0,0,0,0.06)]
                focus:outline-none focus:ring-4 focus:ring-pink-200
              "
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="
                w-full rounded-full bg-white/90 px-5 py-4 text-sm
                shadow-[0_6px_20px_rgba(0,0,0,0.06)]
                focus:outline-none focus:ring-4 focus:ring-pink-200
              "
            />

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

          <div className="mt-6 flex flex-col items-center gap-2 text-xs sm:text-sm text-black/70">
            <button
              onClick={() => navigate("/register")}
              className="font-semibold hover:underline"
            >
              Regístrate
            </button>

            <button
              className="hover:underline"
              onClick={() => navigate("/recuperacion")}
            >
              Olvidé mi contraseña
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}