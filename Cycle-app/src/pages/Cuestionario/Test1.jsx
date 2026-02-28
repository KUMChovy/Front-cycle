import { useState } from "react";
import LogoAvatar from "../../componentes/LogoAvatar";
import logo from "../../assets/calendario.png";

export default function Test1() {
    const [selected, setSelected] = useState(null);

    const options = [
        "Saber solo mis días",
        "Control del ciclo",
        "Seguir mi ciclo",
        "Quedar embarazada",
    ];

    return (
        <div className="fixed inset-0 overflow-hidden bg-[#FCE7F3]">
            {/* ===== Background  ===== */}
            <div className="pointer-events-none absolute -top-24 left-0 h-[340px] w-full rounded-b-[90px] bg-[#FBCFE8]/90" />
            <div className="pointer-events-none absolute -right-44 top-16 h-[520px] w-[520px] rounded-full bg-[#F9A8D4]/55" />
            <div className="pointer-events-none absolute -bottom-64 -left-56 h-[600px] w-[760px] rounded-full bg-[#FBCFE8]/75" />

            <div
                className="
          relative flex h-full w-full items-center justify-center
          px-6 sm:px-10
          pt-[calc(env(safe-area-inset-top)+16px)]
          pb-[calc(env(safe-area-inset-bottom)+16px)]
        "
            >
                <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl">
                    {/* ===== Header  ===== */}
                    <header className="mb-10 flex items-center gap-3">
                        <LogoAvatar src={logo} alt="Logo Cycle" fallback="C" />
                        <div className="leading-tight">
                            <h1 className="text-base sm:text-lg font-semibold text-black">
                                Cycle
                            </h1>
                        </div>
                    </header>

                    {/* ===== Pregunta ===== */}
                    <h2 className="mb-10 text-center text-balance font-black tracking-tight text-black leading-[1.05] text-[clamp(1.6rem,4.5vw,2.6rem)]">
                        ¿Cuál es tu <br />
                        objetivo con <br />
                        Cycle?
                    </h2>

                    {/* ===== Opciones ===== */}
                    <div className="flex flex-col gap-4">
                        {options.map((option, index) => {
                            const isActive = selected === index;

                            return (
                                <button
                                    key={option}
                                    onClick={() => setSelected(index)}
                                    className={`
                    w-full rounded-full px-6 py-4 text-center
                    text-sm sm:text-base font-semibold
                    transition-all duration-300
                    ${isActive
                                            ? "bg-pink-400 text-white shadow-[0_14px_40px_rgba(251,113,133,0.45)]"
                                            : "bg-white/90 text-black shadow-[0_6px_20px_rgba(0,0,0,0.08)]"
                                        }
                    hover:shadow-[0_12px_32px_rgba(251,113,133,0.35)]
                    active:scale-[0.98]
                    focus:outline-none focus:ring-4 focus:ring-pink-200
                  `}
                                >
                                    {option}
                                </button>
                            );
                        })}
                    </div>

                    {/* Indicador de progreso */}
                    <div className="mt-10 flex justify-center gap-2">
                        <span className="h-2 w-6 rounded-full bg-pink-400" />
                        <span className="h-2 w-2 rounded-full bg-pink-200" />
                        <span className="h-2 w-2 rounded-full bg-pink-200" />
                    </div>
                </div>
            </div>
        </div>
    );
}