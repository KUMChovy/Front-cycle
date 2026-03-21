import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import calendario from "../assets/calendario.webp";
import Imagen from "../componentes/Imagen";
import { sesion } from "../componentes/funciones/sesion";

export default function ForgotPassword() {
    sesion();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const token = searchParams.get("token");
    const isResetMode = !!token;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [mensaje, setMensaje] = useState("");

    const handleSendLink = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMensaje("");

        try {
            const response = await fetch("http://localhost/cycle_back/modelo/recu_con.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            setMensaje(data.mensaje);
        } catch {
            setMensaje("Error conectando con el servidor");
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setMensaje("");

        if (password.length < 8) {
            setMensaje("La contraseña debe tener al menos 8 caracteres");
            return;
        }

        if (password !== confirmPassword) {
            setMensaje("Las contraseñas no coinciden");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("http://localhost/cycle_back/modelo/resetear_con.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token,
                    password,
                }),
            });

            const data = await response.json();
            setMensaje(data.mensaje);

            if (data.status === "ok") {
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            }
        } catch {
            setMensaje("Error conectando con el servidor");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 overflow-hidden bg-[#FCE7F3]">
            <div className="pointer-events-none absolute -top-24 left-0 h-[340px] w-full rounded-b-[90px] bg-[#FBCFE8]/90" />
            <div className="pointer-events-none absolute -right-44 top-16 h-[520px] w-[520px] rounded-full bg-[#F9A8D4]/55" />
            <div className="pointer-events-none absolute -bottom-64 -left-56 h-[600px] w-[760px] rounded-full bg-[#FBCFE8]/75" />
            <div className="pointer-events-none absolute bottom-14 right-10 hidden h-[380px] w-[380px] rounded-full border border-white/45 lg:block" />
            <div className="pointer-events-none absolute bottom-5 right-28 hidden h-[260px] w-[260px] rounded-full border border-white/35 lg:block" />

            <div
                className="
                    relative flex h-full w-full items-center justify-center
                    px-6 sm:px-10
                    pt-[calc(env(safe-area-inset-top)+16px)]
                    pb-[calc(env(safe-area-inset-bottom)+16px)]
                "
            >
                <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl">
                    <Imagen
                        src={calendario}
                        alt="Recuperar contraseña"
                    />

                    <h2 className="mb-4 text-center text-balance font-black tracking-tight text-black leading-[0.95] text-[clamp(1.85rem,4.6vw,3.2rem)]">
                        {isResetMode ? "Nueva contraseña" : "Recuperar contraseña"}
                    </h2>

                    <p className="mb-6 text-center text-sm sm:text-base text-black/60">
                        {isResetMode
                            ? "Escribe tu nueva contraseña para restablecer el acceso a tu cuenta."
                            : "Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña."}
                    </p>

                    {!isResetMode ? (
                        <form className="space-y-4" onSubmit={handleSendLink}>
                            <input
                                type="email"
                                placeholder="Correo electrónico"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="
                                    w-full rounded-full bg-white/90 px-5 py-4 text-sm
                                    shadow-[0_6px_20px_rgba(0,0,0,0.06)]
                                    focus:outline-none focus:ring-4 focus:ring-pink-200
                                "
                            />

                            <button
                                type="submit"
                                disabled={loading}
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
                                    disabled:opacity-60
                                "
                            >
                                {loading ? "Enviando..." : "Enviar enlace"}
                            </button>
                        </form>
                    ) : (
                        <form className="space-y-4" onSubmit={handleResetPassword}>
                            <input
                                type="password"
                                placeholder="Nueva contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="
                                    w-full rounded-full bg-white/90 px-5 py-4 text-sm
                                    shadow-[0_6px_20px_rgba(0,0,0,0.06)]
                                    focus:outline-none focus:ring-4 focus:ring-pink-200
                                "
                            />

                            <input
                                type="password"
                                placeholder="Confirmar nueva contraseña"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="
                                    w-full rounded-full bg-white/90 px-5 py-4 text-sm
                                    shadow-[0_6px_20px_rgba(0,0,0,0.06)]
                                    focus:outline-none focus:ring-4 focus:ring-pink-200
                                "
                            />

                            <button
                                type="submit"
                                disabled={loading}
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
                                    disabled:opacity-60
                                "
                            >
                                {loading ? "Guardando..." : "Guardar nueva contraseña"}
                            </button>
                        </form>
                    )}

                    {mensaje && (
                        <p className="mt-4 text-center text-sm text-black/70">
                            {mensaje}
                        </p>
                    )}

                    <div className="mt-6 flex items-center justify-center gap-3 text-xs sm:text-sm text-black/60">
                        <button
                            onClick={() => navigate("/login")}
                            className="underline decoration-pink-400/60 underline-offset-4 hover:text-black"
                        >
                            Volver a iniciar sesión
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}